"""
Paperly OCR Service
FastAPI microservice for extracting text from images using Google's Tesseract OCR.

Tesseract OCR is an open-source text recognition engine originally developed by
Hewlett-Packard and now maintained by Google. It supports 100+ languages and is
the most widely-used OCR engine in the world.

Setup:
  1. Install Tesseract OCR engine:
     - Windows: Download from https://github.com/UB-Mannheim/tesseract/wiki
     - macOS:   brew install tesseract
     - Ubuntu:  sudo apt install tesseract-ocr
  2. Install Python wrapper:
     - pip install pytesseract Pillow
"""

import io
import os
import sys
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ocr-service")

# ─── Tesseract Configuration ──────────────────────────────────
# Auto-detect Tesseract installation on Windows
TESSERACT_AVAILABLE = False

try:
    import pytesseract

    # Common Windows install paths for Tesseract
    WINDOWS_PATHS = [
        r"C:\Program Files\Tesseract-OCR\tesseract.exe",
        r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
        os.path.expanduser(r"~\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"),
        os.path.expanduser(r"~\AppData\Local\Tesseract-OCR\tesseract.exe"),
    ]

    # Check if tesseract is already on PATH
    try:
        pytesseract.get_tesseract_version()
        TESSERACT_AVAILABLE = True
        logger.info(f"✅ Tesseract OCR found on PATH (version {pytesseract.get_tesseract_version()})")
    except Exception:
        # Try common Windows install locations
        if sys.platform == "win32":
            for path in WINDOWS_PATHS:
                if os.path.isfile(path):
                    pytesseract.pytesseract.tesseract_cmd = path
                    try:
                        pytesseract.get_tesseract_version()
                        TESSERACT_AVAILABLE = True
                        logger.info(f"✅ Tesseract OCR found at: {path}")
                        break
                    except Exception:
                        continue

        # Also check TESSERACT_CMD env var
        env_path = os.environ.get("TESSERACT_CMD")
        if env_path and os.path.isfile(env_path):
            pytesseract.pytesseract.tesseract_cmd = env_path
            TESSERACT_AVAILABLE = True
            logger.info(f"✅ Tesseract OCR found via TESSERACT_CMD: {env_path}")

    if not TESSERACT_AVAILABLE:
        logger.warning(
            "⚠️  Tesseract OCR engine is NOT installed.\n"
            "    The service will return helpful placeholder text.\n"
            "    Install Tesseract to enable real OCR:\n"
            "      Windows: https://github.com/UB-Mannheim/tesseract/wiki\n"
            "      macOS:   brew install tesseract\n"
            "      Ubuntu:  sudo apt install tesseract-ocr"
        )

except ImportError:
    logger.error("❌ pytesseract package not installed. Run: pip install pytesseract")


# ─── FastAPI App ──────────────────────────────────────────────
app = FastAPI(
    title="Paperly OCR Service",
    description="Extract text from images using Google's Tesseract OCR engine",
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
    """Health check endpoint."""
    return {
        "status": "ok",
        "service": "ocr-service",
        "engine": "tesseract-ocr",
        "tesseract_available": TESSERACT_AVAILABLE,
    }


@app.post("/ocr")
async def extract_text(image: UploadFile = File(...)):
    """
    Extract text from an uploaded image using Google's Tesseract OCR.

    - Accepts: PNG, JPG, WEBP, BMP, TIFF (max 10 MB)
    - Returns: { "text": "...", "confidence": 85.2 }
    """

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
        # Open image with Pillow
        img = Image.open(io.BytesIO(contents))

        # Convert to RGB if necessary (handles RGBA, palette mode, etc.)
        if img.mode not in ("L", "RGB"):
            img = img.convert("RGB")

        if TESSERACT_AVAILABLE:
            # ─── Google Tesseract OCR ──────────────────
            # Extract text using Tesseract
            text = pytesseract.image_to_string(img, lang="eng")

            # Get detailed data for confidence scoring
            data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)

            # Calculate average confidence (skip entries with -1 confidence)
            confidences = [int(c) for c in data["conf"] if int(c) != -1]
            avg_confidence = sum(confidences) / len(confidences) if confidences else 0.0

            logger.info(
                f"✅ OCR completed: {len(text)} chars, "
                f"{avg_confidence:.1f}% confidence from '{image.filename}'"
            )

            return {
                "text": text.strip(),
                "confidence": round(avg_confidence, 2),
            }
        else:
            # ─── Fallback (Tesseract not installed) ────
            logger.warning(f"Tesseract not installed — returning placeholder for '{image.filename}'")
            return {
                "text": (
                    "[Tesseract OCR Not Installed]\n\n"
                    f"Image received: {image.filename} "
                    f"({len(contents):,} bytes, {img.size[0]}x{img.size[1]}px)\n\n"
                    "To enable real OCR text extraction, install Google's Tesseract OCR:\n\n"
                    "  Windows:\n"
                    "    1. Download: https://github.com/UB-Mannheim/tesseract/wiki\n"
                    "    2. Run the installer (add to PATH when prompted)\n"
                    "    3. Restart this service\n\n"
                    "  macOS:\n"
                    "    brew install tesseract\n\n"
                    "  Ubuntu/Debian:\n"
                    "    sudo apt install tesseract-ocr\n\n"
                    "Then restart this OCR service and try again."
                ),
                "confidence": 0.0,
            }

    except Exception as e:
        logger.error(f"❌ OCR error: {e}")
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    print("=" * 60)
    print("  Paperly OCR Service (Google Tesseract OCR)")
    print(f"  Tesseract Available: {'Yes' if TESSERACT_AVAILABLE else 'No'}")
    print("=" * 60)

    uvicorn.run(app, host="0.0.0.0", port=5001)
