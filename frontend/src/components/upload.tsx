"use client";

import { useCallback, useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadProps {
    onFileSelect: (file: File | null) => void;
}

export function Upload({ onFileSelect }: UploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback(
        (file: File) => {
            if (!file.type.startsWith("image/")) return;
            const url = URL.createObjectURL(file);
            setPreview(url);
            onFileSelect(file);
        },
        [onFileSelect]
    );

    const handleDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    const clearFile = useCallback(() => {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        onFileSelect(null);
        if (inputRef.current) inputRef.current.value = "";
    }, [preview, onFileSelect]);

    return (
        <div className="space-y-4">
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
                className={`flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-all ${isDragging
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20"
                        : "border-border hover:border-indigo-400 hover:bg-muted/50"
                    }`}
            >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                    <ImagePlus className="h-7 w-7 text-indigo-500" />
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium">
                        Drop your image here, or{" "}
                        <span className="text-indigo-500 underline underline-offset-2">
                            browse
                        </span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        PNG, JPG, WEBP up to 10 MB
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

            {preview && (
                <div className="relative overflow-hidden rounded-xl border">
                    <img
                        src={preview}
                        alt="Uploaded preview"
                        className="max-h-[320px] w-full object-contain bg-muted/30"
                    />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            clearFile();
                        }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
