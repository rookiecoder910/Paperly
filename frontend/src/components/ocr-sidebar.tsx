"use client";

import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from "react";
import { CloudUpload, Loader2, ScanText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiExtractText } from "@/lib/api";

export function OcrSidebar() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedText, setExtractedText] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback((f: File) => {
        if (!f.type.startsWith("image/")) return;
        setFile(f);
        setExtractedText("");
        setProgress(0);
    }, []);

    const handleDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);
            const f = e.dataTransfer.files[0];
            if (f) handleFile(f);
        },
        [handleFile]
    );

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
        },
        [handleFile]
    );

    const handleExtract = async () => {
        if (!file) return;
        setIsProcessing(true);
        setProgress(10);

        try {
            // Simulate progress while API processes
            const progressInterval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 8, 90));
            }, 300);

            const result = await apiExtractText(file);

            clearInterval(progressInterval);
            setProgress(100);
            setExtractedText(result.text);
        } catch (error) {
            const message = error instanceof Error ? error.message : "OCR failed";
            setExtractedText(`Error: ${message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <aside className="flex h-full w-72 flex-shrink-0 flex-col border-l border-white/[0.06] bg-white/[0.02]">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                <ScanText className="h-4 w-4 text-violet-400" />
                <h2 className="text-sm font-semibold">OCR & Processing</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {/* Upload dropzone */}
                <div
                    role="button"
                    tabIndex={0}
                    onClick={() => inputRef.current?.click()}
                    onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
                        isDragging
                            ? "border-violet-500 bg-violet-500/10"
                            : "border-white/10 hover:border-violet-400/40 hover:bg-white/[0.03]"
                    }`}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10">
                        <CloudUpload className="h-5 w-5 text-violet-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-300">
                            Upload Document
                        </p>
                        <p className="mt-1 text-[10px] text-slate-500 leading-relaxed">
                            Drop your image or paste text, or accept there.
                        </p>
                    </div>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                />

                {/* File name */}
                {file && (
                    <p className="truncate rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-2 text-xs text-slate-400">
                        📄 {file.name}
                    </p>
                )}

                {/* Processing progress */}
                {(isProcessing || progress > 0) && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                            <span className="flex items-center gap-1.5">
                                {isProcessing && <Loader2 className="h-3 w-3 animate-spin" />}
                                Processing...
                            </span>
                            <span className="font-mono">{progress}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Extract Text button */}
                <Button
                    onClick={handleExtract}
                    disabled={!file || isProcessing}
                    className="w-full gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md hover:from-violet-600 hover:to-purple-700"
                >
                    {isProcessing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <ScanText className="h-4 w-4" />
                    )}
                    {isProcessing ? "Extracting…" : "Extract Text"}
                </Button>

                {/* Extracted text result */}
                {extractedText && (
                    <div className="space-y-2">
                        <p className="text-xs font-medium text-slate-400">Extracted Text:</p>
                        <div className="max-h-48 overflow-y-auto rounded-lg border border-white/[0.06] bg-white/[0.03] p-3 text-xs text-slate-300 leading-relaxed font-mono">
                            {extractedText}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
