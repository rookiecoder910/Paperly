"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenLine, Loader2, Download } from "lucide-react";

const PAGE_WIDTH = 800;
const PAGE_HEIGHT = 1100;
const MARGIN_LEFT = 90;
const MARGIN_RIGHT = 50;
const LINE_HEIGHT = 36;
const FIRST_LINE_Y = 60;
const FONT_SIZE = 22;

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const lines: string[] = [];
    const paragraphs = text.split("\n");

    for (const para of paragraphs) {
        if (para.trim() === "") {
            lines.push("");
            continue;
        }
        const words = para.split(" ");
        let currentLine = "";

        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) lines.push(currentLine);
    }

    return lines;
}

export function HandwritingGenerator() {
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawPage = useCallback(
        (ctx: CanvasRenderingContext2D, lines: string[], startIdx: number): number => {
            // White parchment background
            ctx.fillStyle = "#fffef5";
            ctx.fillRect(0, 0, PAGE_WIDTH, PAGE_HEIGHT);

            // Draw ruled lines
            ctx.strokeStyle = "#c4daf7";
            ctx.lineWidth = 1;
            for (let y = FIRST_LINE_Y; y < PAGE_HEIGHT - 20; y += LINE_HEIGHT) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(PAGE_WIDTH, y);
                ctx.stroke();
            }

            // Red margin line
            ctx.strokeStyle = "#f5b0b0";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(MARGIN_LEFT - 20, 0);
            ctx.lineTo(MARGIN_LEFT - 20, PAGE_HEIGHT);
            ctx.stroke();

            // Draw text
            ctx.fillStyle = "#1a237e";
            ctx.font = `${FONT_SIZE}px Caveat, 'Segoe Script', cursive`;

            const maxLines = Math.floor((PAGE_HEIGHT - FIRST_LINE_Y - 20) / LINE_HEIGHT);
            let lineIndex = startIdx;
            let y = FIRST_LINE_Y - 6;

            while (lineIndex < lines.length && lineIndex - startIdx < maxLines) {
                ctx.fillText(lines[lineIndex], MARGIN_LEFT, y);
                y += LINE_HEIGHT;
                lineIndex++;
            }

            return lineIndex;
        },
        []
    );

    const handleGenerate = async () => {
        if (!inputText.trim()) return;
        setIsLoading(true);

        // Small delay to let the UI update
        await new Promise((r) => setTimeout(r, 100));

        try {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = PAGE_WIDTH;
            canvas.height = PAGE_HEIGHT;

            const maxWidth = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
            ctx.font = `${FONT_SIZE}px Caveat, 'Segoe Script', cursive`;
            const wrappedLines = wrapText(ctx, inputText, maxWidth);

            drawPage(ctx, wrappedLines, 0);

            const dataUrl = canvas.toDataURL("image/png");
            setGeneratedImage(dataUrl);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (!generatedImage) return;
        const a = document.createElement("a");
        a.href = generatedImage;
        a.download = "paperly-handwriting.png";
        a.click();
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium">Enter your text</label>
                <Textarea
                    placeholder="Type or paste the text you want to convert to handwriting…"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={6}
                    className="resize-y"
                />
            </div>

            <div className="flex items-center gap-3">
                <Button
                    onClick={handleGenerate}
                    disabled={!inputText.trim() || isLoading}
                    className="gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md hover:from-indigo-600 hover:to-violet-700"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <PenLine className="h-4 w-4" />
                    )}
                    {isLoading ? "Generating…" : "Generate Handwritten Image"}
                </Button>

                {generatedImage && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        className="gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Download PNG
                    </Button>
                )}
            </div>

            {/* Hidden canvas for rendering */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Preview */}
            {generatedImage && (
                <div className="overflow-hidden rounded-xl border border-white/10 shadow-xl">
                    <img
                        src={generatedImage}
                        alt="Generated handwriting preview"
                        className="w-full"
                    />
                </div>
            )}
        </div>
    );
}
