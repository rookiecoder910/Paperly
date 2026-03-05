"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "@/components/upload";
import { OcrResult } from "@/components/ocr-result";
import { HandwritingGenerator } from "@/components/handwriting-generator";
import { ScanText, PenLine } from "lucide-react";

export function FeatureTabs() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    return (
        <Tabs defaultValue="ocr" className="w-full">
            <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="ocr" className="gap-2">
                    <ScanText className="h-4 w-4" />
                    OCR Tool
                </TabsTrigger>
                <TabsTrigger value="handwriting" className="gap-2">
                    <PenLine className="h-4 w-4" />
                    Handwriting
                </TabsTrigger>
            </TabsList>

            <TabsContent value="ocr" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Image to Text (OCR)</CardTitle>
                        <CardDescription>
                            Upload an image and extract text from it using AI-powered OCR.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Upload onFileSelect={setSelectedFile} />
                        <OcrResult file={selectedFile} />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="handwriting" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Text to Handwriting</CardTitle>
                        <CardDescription>
                            Enter text and generate a handwritten-style image you can download.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <HandwritingGenerator />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
