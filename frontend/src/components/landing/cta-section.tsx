"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn, GradientBorder } from "@/components/animations";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/12 to-violet-600/12 blur-[120px] animate-glow-pulse" />
      </div>

      <FadeIn className="relative mx-auto max-w-3xl px-4 text-center" duration={1}>
        <div className="relative rounded-2xl p-px sm:rounded-3xl bg-gradient-to-br from-indigo-500/25 via-violet-500/15 to-purple-500/25 animate-gradient-shift">
          <div className="rounded-2xl bg-background/85 p-8 backdrop-blur-xl sm:rounded-3xl sm:p-14 lg:p-20">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <Sparkles className="h-7 w-7 text-indigo-400" />
            </div>
            <h2 className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Ready to Transform{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Your Documents?
              </span>
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-base text-muted-foreground sm:mb-10 sm:text-lg">
              Sign up for free and start converting images to text and generating
              handwritten notes in seconds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="group gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-7 py-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/35 hover:from-indigo-600 hover:to-violet-700 sm:px-9 sm:py-7 sm:text-base"
              >
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-full border-white/10 bg-white/[0.04] px-7 py-6 text-sm backdrop-blur-sm transition-all hover:bg-white/[0.08] sm:px-9 sm:py-7 sm:text-base"
              >
                <Link href="/login">Log In</Link>
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
