"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenLine, Loader2, Download } from "lucide-react";

export function HandwritingGenerator() {
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!inputText.trim()) return;
        setIsLoading(true);
        // Mock generation — will be replaced by real API call
        await new Promise((r) => setTimeout(r, 1800));
        // Create a simple SVG placeholder so the UI is visual
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <rect width="600" height="400" fill="#fffef5"/>
      <line x1="0" y1="40" x2="600" y2="40" stroke="#c4daf7" stroke-width="1"/>
      <line x1="0" y1="80" x2="600" y2="80" stroke="#c4daf7" stroke-width="1"/>
      <line x1="0" y1="120" x2="600" y2="120" stroke="#c4daf7" stroke-width="1"/>
      <line x1="0" y1="160" x2="600" y2="160" stroke="#c4daf7" stroke-width="1"/>
      <line x1="0" y1="200" x2="600" y2="200" stroke="#c4daf7" stroke-width="1"/>
      <line x1="0" y1="240" x2="600" y2="240" stroke="#c4daf7" stroke-width="1"/>
      <line x1="0" y1="280" x2="600" y2="280" stroke="#c4daf7" stroke-width="1"/>
      <line x1="0" y1="320" x2="600" y2="320" stroke="#c4daf7" stroke-width="1"/>
      <line x1="0" y1="360" x2="600" y2="360" stroke="#c4daf7" stroke-width="1"/>
      <line x1="60" y1="0" x2="60" y2="400" stroke="#f5b0b0" stroke-width="1.5"/>
      <text x="80" y="38" font-family="'Segoe Script', 'Comic Sans MS', cursive" font-size="16" fill="#1a237e">${inputText.slice(0, 60)}</text>
      <text x="80" y="78" font-family="'Segoe Script', 'Comic Sans MS', cursive" font-size="16" fill="#1a237e">${inputText.slice(60, 120)}</text>
      <text x="80" y="118" font-family="'Segoe Script', 'Comic Sans MS', cursive" font-size="16" fill="#1a237e">${inputText.slice(120, 180)}</text>
    </svg>`;
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        setGeneratedImage(url);
        setIsLoading(false);
    };

    const handleDownload = () => {
        if (!generatedImage) return;
        const a = document.createElement("a");
        a.href = generatedImage;
        a.download = "paperly-handwriting.svg";
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
                        Download
                    </Button>
                )}
            </div>

            {generatedImage && (
                <div className="overflow-hidden rounded-xl border bg-white">
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
