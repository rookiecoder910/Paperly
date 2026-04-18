"""
Paperly Handwriting Service
FastAPI microservice for generating handwritten-style images from text using Pillow.
"""

import io
import base64
import logging
import os
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image, ImageDraw, ImageFont

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("handwriting-service")

app = FastAPI(
    title="Paperly Handwriting Service",
    description="Generate handwritten-style images from text",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Constants ─────────────────────────────────────────
PAGE_WIDTH = 800
PAGE_HEIGHT = 1100
MARGIN_LEFT = 90
MARGIN_RIGHT = 50
MARGIN_TOP = 60
LINE_HEIGHT = 36
FONT_SIZE = 24
TEXT_COLOR = (26, 35, 126)          # Dark navy blue (#1a237e)
RULED_LINE_COLOR = (196, 218, 247)  # Light blue (#c4daf7)
MARGIN_LINE_COLOR = (245, 176, 176) # Light red (#f5b0b0)
PAGE_BG_COLOR = (255, 254, 245)     # Off-white parchment (#fffef5)


def get_font(size: int) -> ImageFont.FreeTypeFont:
    """Try to load a handwriting-style font, fall back to default."""
    # Common handwriting font paths
    font_paths = [
        # Windows
        "C:/Windows/Fonts/comic.ttf",
        "C:/Windows/Fonts/comicbd.ttf",
        "C:/Windows/Fonts/segoesc.ttf",
        "C:/Windows/Fonts/segoepr.ttf",
        # Linux
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf",
        # macOS
        "/System/Library/Fonts/Noteworthy.ttc",
        "/Library/Fonts/Comic Sans MS.ttf",
    ]

    # Check for bundled font first
    bundled = os.path.join(os.path.dirname(__file__), "fonts", "Caveat-Regular.ttf")
    if os.path.exists(bundled):
        font_paths.insert(0, bundled)

    for path in font_paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue

    # Fall back to default bitmap font
    logger.warning("No handwriting font found, using default font")
    return ImageFont.load_default()


def wrap_text(text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    """Wrap text to fit within max_width pixels."""
    lines = []
    # Create a temporary image for text measurement
    tmp_img = Image.new("RGB", (1, 1))
    draw = ImageDraw.Draw(tmp_img)

    for paragraph in text.split("\n"):
        if paragraph.strip() == "":
            lines.append("")
            continue

        words = paragraph.split(" ")
        current_line = ""

        for word in words:
            test_line = f"{current_line} {word}".strip() if current_line else word
            bbox = draw.textbbox((0, 0), test_line, font=font)
            text_width = bbox[2] - bbox[0]

            if text_width > max_width and current_line:
                lines.append(current_line)
                current_line = word
            else:
                current_line = test_line

        if current_line:
            lines.append(current_line)

    return lines


def draw_page(lines: list[str], start_idx: int, font: ImageFont.FreeTypeFont) -> tuple[Image.Image, int]:
    """Draw a single page with ruled lines. Returns (image, next_line_index)."""
    img = Image.new("RGB", (PAGE_WIDTH, PAGE_HEIGHT), PAGE_BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Draw ruled lines
    y = MARGIN_TOP
    while y < PAGE_HEIGHT - 20:
        draw.line([(0, y), (PAGE_WIDTH, y)], fill=RULED_LINE_COLOR, width=1)
        y += LINE_HEIGHT

    # Draw red margin line
    margin_x = MARGIN_LEFT - 20
    draw.line([(margin_x, 0), (margin_x, PAGE_HEIGHT)], fill=MARGIN_LINE_COLOR, width=2)

    # Draw text
    max_lines_per_page = (PAGE_HEIGHT - MARGIN_TOP - 40) // LINE_HEIGHT
    line_idx = start_idx
    y = MARGIN_TOP - 8  # slight offset above the ruled line

    while line_idx < len(lines) and (line_idx - start_idx) < max_lines_per_page:
        draw.text((MARGIN_LEFT, y), lines[line_idx], fill=TEXT_COLOR, font=font)
        y += LINE_HEIGHT
        line_idx += 1

    return img, line_idx


class GenerateRequest(BaseModel):
    text: str
    font_size: Optional[int] = FONT_SIZE


@app.get("/health")
def health():
    return {"status": "ok", "service": "handwriting-service"}


@app.post("/generate")
async def generate_handwriting(req: GenerateRequest):
    """Generate a handwritten-style image from the provided text."""
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text is required")

    if len(req.text) > 50000:
        raise HTTPException(status_code=400, detail="Text must be less than 50,000 characters")

    try:
        font = get_font(req.font_size or FONT_SIZE)
        max_width = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT

        # Wrap text into lines
        wrapped_lines = wrap_text(req.text, font, max_width)

        # Generate pages
        pages = []
        start_idx = 0
        while start_idx < len(wrapped_lines):
            page_img, start_idx = draw_page(wrapped_lines, start_idx, font)
            pages.append(page_img)

        if not pages:
            raise HTTPException(status_code=400, detail="No content to render")

        # For now, return the first page as base64 PNG
        # (multi-page PDF export can be added later)
        buf = io.BytesIO()
        pages[0].save(buf, format="PNG", quality=95)
        buf.seek(0)

        image_base64 = base64.b64encode(buf.getvalue()).decode("utf-8")

        logger.info(
            f"Handwriting generated: {len(wrapped_lines)} lines, "
            f"{len(pages)} page(s), {len(req.text)} chars"
        )

        return {
            "image": image_base64,
            "pages": len(pages),
            "lines": len(wrapped_lines),
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Handwriting generation error: {e}")
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5002)
