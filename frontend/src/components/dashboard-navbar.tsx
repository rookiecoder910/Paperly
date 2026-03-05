"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { PenLine, LogOut, Sun, Moon } from "lucide-react";

export function DashboardNavbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
            {/* Gradient accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link href="/dashboard" className="flex items-center gap-2.5 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white transition-transform group-hover:scale-105">
                        <PenLine className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Paperly</span>
                </Link>

                <div className="flex items-center gap-3 sm:gap-4">
                    {user && (
                        <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hidden text-sm text-muted-foreground sm:inline-block"
                        >
                            Hey, <span className="font-medium text-foreground">{user.name}</span>
                        </motion.span>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="rounded-full hover:bg-white/[0.06]"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={logout}
                        className="gap-2 rounded-full border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </nav>
    );
}
