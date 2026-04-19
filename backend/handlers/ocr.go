package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/textproto"

	"github.com/gin-gonic/gin"
	"github.com/rookiecoder910/paperly-backend/config"
)

// OCRHandler holds dependencies for OCR-related endpoints.
type OCRHandler struct {
	Cfg *config.Config
}

// NewOCRHandler creates a new OCRHandler.
func NewOCRHandler(cfg *config.Config) *OCRHandler {
	return &OCRHandler{Cfg: cfg}
}

// OCRResponse is the response from the OCR service.
type OCRResponse struct {
	Text       string  `json:"text"`
	Confidence float64 `json:"confidence,omitempty"`
}

// ExtractText receives an image upload and proxies it to the Python OCR service.
func (h *OCRHandler) ExtractText(c *gin.Context) {
	// Get the uploaded file
	file, header, err := c.Request.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Image file is required (field name: 'image')"})
		return
	}
	defer file.Close()

	// Validate file size (max 10 MB)
	if header.Size > 10*1024*1024 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File size must be less than 10 MB"})
		return
	}

	// Build multipart request to forward to OCR service
	var buf bytes.Buffer
	writer := multipart.NewWriter(&buf)

	// Use CreatePart (not CreateFormFile) to preserve the original content type
	partHeader := make(textproto.MIMEHeader)
	partHeader.Set("Content-Disposition", fmt.Sprintf(`form-data; name="image"; filename="%s"`, header.Filename))
	contentType := header.Header.Get("Content-Type")
	if contentType == "" {
		contentType = "application/octet-stream"
	}
	partHeader.Set("Content-Type", contentType)

	part, err := writer.CreatePart(partHeader)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to prepare OCR request"})
		return
	}

	if _, err := io.Copy(part, file); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read uploaded file"})
		return
	}
	writer.Close()

	// Send request to OCR service
	ocrURL := fmt.Sprintf("%s/ocr", h.Cfg.OCRServiceURL)
	req, err := http.NewRequest("POST", ocrURL, &buf)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create OCR request"})
		return
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"error":   "OCR service is unavailable",
			"details": "Make sure the OCR service is running on " + h.Cfg.OCRServiceURL,
		})
		return
	}
	defer resp.Body.Close()

	// Read and forward the response
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read OCR response"})
		return
	}

	if resp.StatusCode != http.StatusOK {
		c.JSON(resp.StatusCode, gin.H{"error": "OCR service error", "details": string(body)})
		return
	}

	var ocrResp OCRResponse
	if err := json.Unmarshal(body, &ocrResp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse OCR response"})
		return
	}

	c.JSON(http.StatusOK, ocrResp)
}
