"""
Paperly OCR Service
FastAPI microservice for extracting text from images using Tesseract OCR.
"""

import io
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

# Try to import pytesseract; if not available, use a fallback
try:
    import pytesseract
    TESSERACT_AVAILABLE = True
except ImportError:
    TESSERACT_AVAILABLE = False

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ocr-service")

app = FastAPI(
    title="Paperly OCR Service",
    description="Extract text from images using Tesseract OCR",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

ALLOWED_TYPES = {"image/png", "image/jpeg", "image/jpg", "image/webp", "image/bmp", "image/tiff"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "ocr-service",
        "tesseract_available": TESSERACT_AVAILABLE,
    }


@app.post("/ocr")
async def extract_text(image: UploadFile = File(...)):
    """Extract text from an uploaded image using Tesseract OCR."""

    # Validate content type
    if image.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {image.content_type}. Supported: PNG, JPG, WEBP, BMP, TIFF",
        )

    # Read file contents
    contents = await image.read()

    # Validate file size
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size must be less than 10 MB")

    try:
        # Open with Pillow
        img = Image.open(io.BytesIO(contents))

        # Convert to RGB if necessary (handles RGBA, P, etc.)
        if img.mode not in ("L", "RGB"):
            img = img.convert("RGB")

        if TESSERACT_AVAILABLE:
            # Extract text using Tesseract
            data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)
            text = pytesseract.image_to_string(img, lang="eng")

            # Calculate average confidence (skip entries with -1 confidence)
            confidences = [c for c in data["conf"] if c != -1]
            avg_confidence = sum(confidences) / len(confidences) if confidences else 0.0

            logger.info(
                f"OCR completed: {len(text)} chars, {avg_confidence:.1f}% confidence from '{image.filename}'"
            )

            return {
                "text": text.strip(),
                "confidence": round(avg_confidence, 2),
            }
        else:
            # Fallback: return a helpful message
            logger.warning("Tesseract not installed — returning placeholder")
            return {
                "text": (
                    f"[OCR Placeholder]\n\n"
                    f"Tesseract OCR is not installed on this system.\n"
                    f"Image received: {image.filename} ({len(contents)} bytes)\n\n"
                    f"To enable real OCR, install Tesseract:\n"
                    f"  Windows: choco install tesseract\n"
                    f"  Ubuntu:  sudo apt install tesseract-ocr\n"
                    f"  macOS:   brew install tesseract\n\n"
                    f"Then install pytesseract: pip install pytesseract"
                ),
                "confidence": 0.0,
            }

    except Exception as e:
        logger.error(f"OCR error: {e}")
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5001)
