"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { FeatureTabs } from "@/components/feature-tabs";
import { Loader2, Sparkles } from "lucide-react";

export default function DashboardPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const shouldReduce = useReducedMotion();

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

    const animProps = shouldReduce
        ? {}
        : {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
        };

    return (
        <div className="relative min-h-screen">
            {/* Background — lighter on mobile */}
            <div className="pointer-events-none fixed inset-0 gradient-mesh opacity-40 sm:opacity-50" />

            <div className="relative z-10">
                <DashboardNavbar />

                <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
                    {/* Welcome card */}
                    <motion.div {...animProps} className="mb-6 sm:mb-8">
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur-sm sm:rounded-2xl sm:p-6 md:p-8">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 sm:h-12 sm:w-12 sm:rounded-xl">
                                    <Sparkles className="h-5 w-5 text-indigo-400 sm:h-6 sm:w-6" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                                        Welcome back, {user.name}
                                    </h1>
                                    <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm md:text-base">
                                        Choose a tool below to get started.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        {...(shouldReduce
                            ? {}
                            : {
                                initial: { opacity: 0, y: 16 },
                                animate: { opacity: 1, y: 0 },
                                transition: { duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const },
                            })}
                    >
                        <FeatureTabs />
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
