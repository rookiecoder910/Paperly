"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScanText, Loader2, Copy, Check } from "lucide-react";
import { apiExtractText } from "@/lib/api";

interface OcrResultProps {
    file: File | null;
}

export function OcrResult({ file }: OcrResultProps) {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleExtract = async () => {
        if (!file) return;
        setIsLoading(true);

        try {
            const result = await apiExtractText(file);
            setText(result.text);
        } catch (error) {
            const message = error instanceof Error ? error.message : "OCR extraction failed";
            setText(`Error: ${message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Button
                    onClick={handleExtract}
                    disabled={!file || isLoading}
                    className="gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md hover:from-indigo-600 hover:to-violet-700"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <ScanText className="h-4 w-4" />
                    )}
                    {isLoading ? "Extracting…" : "Extract Text"}
                </Button>

                {text && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="gap-2"
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-green-500" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                        {copied ? "Copied" : "Copy"}
                    </Button>
                )}
            </div>

            <Textarea
                placeholder="Extracted text will appear here…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={10}
                className="resize-y font-mono text-sm"
            />
        </div>
    );
}
