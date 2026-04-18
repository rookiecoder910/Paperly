package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rookiecoder910/paperly-backend/config"
)

// HandwritingHandler holds dependencies for handwriting generation endpoints.
type HandwritingHandler struct {
	Cfg *config.Config
}

// NewHandwritingHandler creates a new HandwritingHandler.
func NewHandwritingHandler(cfg *config.Config) *HandwritingHandler {
	return &HandwritingHandler{Cfg: cfg}
}

// GenerateRequest is the expected body for POST /api/generate.
type GenerateRequest struct {
	Text string `json:"text" binding:"required"`
}

// GenerateResponse is the response from the handwriting service.
type GenerateResponse struct {
	Image string `json:"image"` // base64-encoded PNG
}

// Generate receives text and proxies it to the Python handwriting service.
func (h *HandwritingHandler) Generate(c *gin.Context) {
	var req GenerateRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Text is required"})
		return
	}

	if len(req.Text) > 50000 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Text must be less than 50,000 characters"})
		return
	}

	// Forward request to handwriting service
	payload, _ := json.Marshal(req)
	hwURL := fmt.Sprintf("%s/generate", h.Cfg.HandwritingServiceURL)

	resp, err := http.Post(hwURL, "application/json", bytes.NewBuffer(payload))
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"error":   "Handwriting service is unavailable",
			"details": "Make sure the handwriting service is running on " + h.Cfg.HandwritingServiceURL,
		})
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read handwriting response"})
		return
	}

	if resp.StatusCode != http.StatusOK {
		c.JSON(resp.StatusCode, gin.H{"error": "Handwriting service error", "details": string(body)})
		return
	}

	var genResp GenerateResponse
	if err := json.Unmarshal(body, &genResp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse handwriting response"})
		return
	}

	c.JSON(http.StatusOK, genResp)
}
