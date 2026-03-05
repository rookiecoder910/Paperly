"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { FeatureTabs } from "@/components/feature-tabs";
import { Loader2, Sparkles } from "lucide-react";

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
            {/* Background gradient mesh */}
            <div className="pointer-events-none fixed inset-0 gradient-mesh opacity-50" />
            <div className="pointer-events-none fixed inset-0 noise-overlay opacity-50" />

            <div className="relative z-10">
                <DashboardNavbar />

                <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
                    {/* Welcome card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8"
                    >
                        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                    <Sparkles className="h-6 w-6 text-indigo-400" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                                        Welcome back, {user.name}
                                    </h1>
                                    <p className="mt-1 text-muted-foreground">
                                        Choose a tool below to get started.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <FeatureTabs />
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
