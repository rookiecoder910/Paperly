"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";
import { PenLine, Sun, Moon } from "lucide-react";

export function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white transition-transform group-hover:scale-105">
                        <PenLine className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Paperly</span>
                </Link>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="rounded-full"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button
                        asChild
                        className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md hover:from-indigo-600 hover:to-violet-700"
                    >
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
