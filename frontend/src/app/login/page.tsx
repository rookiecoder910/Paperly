"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenLine, Loader2 } from "lucide-react";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-bg flex min-h-screen flex-col">
            {/* Extra orb (dark mode only) */}
            <div className="animated-orbs-extra dark:block hidden" />

            {/* Top navbar */}
            <nav className="relative z-10 flex items-center gap-2 px-6 py-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                        <PenLine className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-bold text-foreground">Paperly</span>
                </Link>
            </nav>

            {/* Subtle top border */}
            <div className="gradient-divider mx-6" />

            {/* Card */}
            <div className="relative z-10 flex flex-1 items-center justify-center px-4">
                <div className="auth-card w-full max-w-md px-8 py-10 sm:px-10 sm:py-12">
                    <h1 className="mb-8 text-center text-3xl font-bold text-foreground sm:text-4xl">
                        Welcome Back
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-600 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 border-border bg-foreground/[0.04] text-foreground placeholder:text-muted-foreground focus:border-indigo-400/40 focus:ring-indigo-400/20"
                        />

                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-12 border-border bg-foreground/[0.04] text-foreground placeholder:text-muted-foreground focus:border-indigo-400/40 focus:ring-indigo-400/20"
                        />

                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-12 w-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/35 hover:brightness-110"
                        >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? "Signing in…" : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-4 text-center">
                        <Link
                            href="#"
                            className="text-sm text-indigo-600 dark:text-cyan-400 hover:text-indigo-500 dark:hover:text-cyan-300 transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="gradient-divider flex-1" />
                        <span className="text-xs text-muted-foreground">Or</span>
                        <div className="gradient-divider flex-1" />
                    </div>

                    {/* Google sign-in */}
                    <button
                        type="button"
                        className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-foreground/[0.04] px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-foreground/[0.08]"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Or sign in with Google
                    </button>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-indigo-600 dark:text-cyan-400 hover:text-indigo-500 dark:hover:text-cyan-300 transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
