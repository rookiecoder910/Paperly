"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { NoteSidebar } from "@/components/note-sidebar";
import { DocumentCanvas } from "@/components/document-canvas";
import { OcrSidebar } from "@/components/ocr-sidebar";
import { FeaturesSection } from "@/components/landing/features-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { Loader2 } from "lucide-react";

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

                {/* Below workspace — feature showcase & CTA (scroll down) */}
                <div className="border-t border-white/[0.06]">
                    <FeaturesSection />
                    <CtaSection />
                    <Footer />
                </div>
            </div>
        </div>
    );
}
