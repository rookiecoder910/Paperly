"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";
import { PenLine, Sun, Moon, Menu, X } from "lucide-react";

export function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`fixed top-0 z-50 w-full transition-all duration-500 ${
                scrolled || mobileOpen
                    ? "border-b border-white/10 bg-background/70 shadow-lg shadow-black/5 backdrop-blur-xl"
                    : "bg-transparent"
            }`}
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white transition-transform group-hover:scale-105">
                        <PenLine className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Paperly</span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden items-center gap-3 sm:flex">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="rounded-full hover:bg-white/10"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                    <Button variant="ghost" asChild className="hover:bg-white/10">
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button
                        asChild
                        className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:from-indigo-600 hover:to-violet-700"
                    >
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>

                {/* Mobile toggle */}
                <div className="flex items-center gap-2 sm:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="rounded-full hover:bg-white/10"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileOpen((v) => !v)}
                        className="rounded-full hover:bg-white/10"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-white/5 bg-background/90 backdrop-blur-xl sm:hidden"
                    >
                        <div className="flex flex-col gap-2 px-4 py-4">
                            <Button variant="ghost" asChild className="w-full justify-start hover:bg-white/10" onClick={() => setMobileOpen(false)}>
                                <Link href="/login">Log In</Link>
                            </Button>
                            <Button
                                asChild
                                className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md"
                                onClick={() => setMobileOpen(false)}
                            >
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
