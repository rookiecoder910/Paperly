"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { NoteSidebar } from "@/components/note-sidebar";
import { DocumentCanvas } from "@/components/document-canvas";
import { OcrSidebar } from "@/components/ocr-sidebar";
import { Loader2, PenLine } from "lucide-react";

export default function DashboardPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/login");
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div className="pointer-events-none fixed inset-0 gradient-mesh opacity-40" />

            <div className="relative z-10 flex flex-col">
                <DashboardNavbar />

                {/* Three-panel workspace */}
                <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
                    {/* Left sidebar — hidden on mobile */}
                    <div className="hidden lg:flex">
                        <NoteSidebar />
                    </div>

                    {/* Center canvas */}
                    <DocumentCanvas />

                    {/* Right sidebar — hidden on mobile */}
                    <div className="hidden md:flex">
                        <OcrSidebar />
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-white/[0.06]">
                    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 md:py-16">
                        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:justify-between">
                            {/* Brand + description */}
                            <div className="max-w-sm">
                                <Link href="/" className="mb-4 flex items-center gap-2 group">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 text-white transition-transform group-hover:scale-105 sm:h-8 sm:w-8 sm:rounded-lg">
                                        <PenLine className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </div>
                                    <span className="text-base font-bold sm:text-lg">Paperly</span>
                                </Link>
                                <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                    AI-powered OCR and handwriting generation.<br />
                                    Transform your documents effortlessly.
                                </p>
                            </div>

                            {/* Link columns */}
                            <div className="flex flex-wrap gap-12 sm:gap-16 lg:gap-20">
                                <div>
                                    <h4 className="mb-3 text-xs font-semibold sm:mb-4 sm:text-sm">Product</h4>
                                    <ul className="space-y-2 sm:space-y-3">
                                        <li><Link href="/dashboard" className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">OCR Tool</Link></li>
                                        <li><Link href="/dashboard" className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">Handwriting Generator</Link></li>
                                        <li><Link href="/dashboard" className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">Export</Link></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="mb-3 text-xs font-semibold sm:mb-4 sm:text-sm">Account</h4>
                                    <ul className="space-y-2 sm:space-y-3">
                                        <li><Link href="/signup" className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">Sign Up</Link></li>
                                        <li><Link href="/login" className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">Log In</Link></li>
                                        <li><Link href="/dashboard" className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm">Dashboard</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Bottom bar */}
                        <div className="mt-8 border-t border-white/[0.06] pt-5 sm:mt-10 sm:pt-6">
                            <p className="text-[10px] text-muted-foreground sm:text-xs">
                                © 2026 Paperly. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

