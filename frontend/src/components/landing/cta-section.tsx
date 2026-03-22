"use client";

import Link from "next/link";
import { FadeIn } from "@/components/animations";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-600/10 blur-[60px] sm:h-[400px] sm:w-[700px] sm:blur-[80px] lg:h-[500px] lg:w-[900px] lg:blur-[120px] animate-glow-pulse" />
      </div>

      <FadeIn className="relative mx-auto max-w-3xl px-4 text-center" duration={0.8}>
        <div className="relative rounded-2xl p-px sm:rounded-3xl bg-gradient-to-br from-indigo-500/25 via-violet-500/15 to-purple-500/25">
          <div className="rounded-2xl bg-background/85 p-8 backdrop-blur-md sm:rounded-3xl sm:p-12 md:p-16">
            <h2 className="mb-6 text-2xl font-extrabold uppercase tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Ready to Transform{" "}
              <br className="hidden sm:block" />
              Your Documents?
            </h2>
            <Link
              href="/signup"
              className="inline-block rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/35 hover:scale-105 sm:px-10 sm:py-4 sm:text-base"
            >
              Get Started Free
            </Link>
            <div className="mt-4">
              <Link
                href="/login"
                className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
