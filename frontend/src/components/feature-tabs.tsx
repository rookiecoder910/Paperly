"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "@/components/upload";
import { OcrResult } from "@/components/ocr-result";
import { HandwritingGenerator } from "@/components/handwriting-generator";
import { ScanText, PenLine } from "lucide-react";

export function FeatureTabs() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [activeTab, setActiveTab] = useState("ocr");

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mx-auto grid w-full max-w-md grid-cols-2 rounded-xl bg-white/[0.04] border border-white/[0.06] p-1">
                <TabsTrigger
                    value="ocr"
                    className="gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/20 data-[state=active]:to-violet-500/20 data-[state=active]:border data-[state=active]:border-white/10 data-[state=active]:shadow-sm transition-all"
                >
                    <ScanText className="h-4 w-4" />
                    OCR Tool
                </TabsTrigger>
                <TabsTrigger
                    value="handwriting"
                    className="gap-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:border data-[state=active]:border-white/10 data-[state=active]:shadow-sm transition-all"
                >
                    <PenLine className="h-4 w-4" />
                    Handwriting
                </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <TabsContent value="ocr" className="mt-6" forceMount={activeTab === "ocr" ? true : undefined}>
                        <Card className="border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
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

                    <TabsContent value="handwriting" className="mt-6" forceMount={activeTab === "handwriting" ? true : undefined}>
                        <Card className="border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
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
                </motion.div>
            </AnimatePresence>
        </Tabs>
    );
}
