"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { FeatureTabs } from "@/components/feature-tabs";
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
        <div className="min-h-screen bg-muted/20">
            <DashboardNavbar />

            <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Choose a tool below to get started.
                    </p>
                </div>

                <FeatureTabs />
            </main>
        </div>
    );
}
