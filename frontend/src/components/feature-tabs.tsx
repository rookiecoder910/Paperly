"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "@/components/upload";
import { OcrResult } from "@/components/ocr-result";
import { HandwritingGenerator } from "@/components/handwriting-generator";
import { ScanText, PenLine } from "lucide-react";

export function FeatureTabs() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [activeTab, setActiveTab] = useState("ocr");
    const shouldReduce = useReducedMotion();

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mx-auto grid w-full max-w-md grid-cols-2 rounded-lg bg-white/[0.04] border border-white/[0.06] p-1 sm:rounded-xl">
                <TabsTrigger
                    value="ocr"
                    className="gap-1.5 rounded-md text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/20 data-[state=active]:to-violet-500/20 data-[state=active]:border data-[state=active]:border-white/10 data-[state=active]:shadow-sm transition-all sm:gap-2 sm:rounded-lg sm:text-sm"
                >
                    <ScanText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    OCR Tool
                </TabsTrigger>
                <TabsTrigger
                    value="handwriting"
                    className="gap-1.5 rounded-md text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:border data-[state=active]:border-white/10 data-[state=active]:shadow-sm transition-all sm:gap-2 sm:rounded-lg sm:text-sm"
                >
                    <PenLine className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Handwriting
                </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduce ? {} : { opacity: 0, y: -8 }}
                    transition={{ duration: shouldReduce ? 0.01 : 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                    <TabsContent value="ocr" className="mt-4 sm:mt-6" forceMount={activeTab === "ocr" ? true : undefined}>
                        <Card className="border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-base sm:text-lg">Image to Text (OCR)</CardTitle>
                                <CardDescription className="text-xs sm:text-sm">
                                    Upload an image and extract text from it using AI-powered OCR.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 p-4 pt-0 sm:space-y-6 sm:p-6 sm:pt-0">
                                <Upload onFileSelect={setSelectedFile} />
                                <OcrResult file={selectedFile} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="handwriting" className="mt-4 sm:mt-6" forceMount={activeTab === "handwriting" ? true : undefined}>
                        <Card className="border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-base sm:text-lg">Text to Handwriting</CardTitle>
                                <CardDescription className="text-xs sm:text-sm">
                                    Enter text and generate a handwritten-style image you can download.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                                <HandwritingGenerator />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </motion.div>
            </AnimatePresence>
        </Tabs>
    );
}
