"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Background glow — smaller on mobile */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-600/10 blur-[60px] sm:h-[400px] sm:w-[700px] sm:blur-[80px] lg:h-[500px] lg:w-[900px] lg:blur-[120px] animate-glow-pulse" />
      </div>

      <FadeIn className="relative mx-auto max-w-3xl px-4 text-center" duration={0.8}>
        <div className={`relative rounded-2xl p-px sm:rounded-3xl bg-gradient-to-br from-indigo-500/25 via-violet-500/15 to-purple-500/25 ${shouldReduce ? "" : "animate-gradient-shift"}`}>
          <div className="rounded-2xl bg-background/85 p-6 backdrop-blur-md sm:rounded-3xl sm:p-10 md:p-14 lg:p-18">
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl">
              <Sparkles className="h-5 w-5 text-indigo-400 sm:h-7 sm:w-7" />
            </div>
            <h2 className="mb-4 text-xl font-bold tracking-tight sm:mb-5 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              Ready to Transform{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Your Documents?
              </span>
            </h2>
            <p className="mx-auto mb-6 max-w-lg text-sm text-muted-foreground sm:mb-8 sm:text-base md:text-lg">
              Sign up for free and start converting images to text and generating
              handwritten notes in seconds.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button
                asChild
                size="lg"
                className="group w-full gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-shadow hover:shadow-xl hover:shadow-indigo-500/35 sm:w-auto sm:px-8 sm:py-6 sm:text-base"
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
                className="w-full rounded-full border-white/10 bg-white/[0.04] px-6 py-5 text-sm backdrop-blur-sm transition-colors hover:bg-white/[0.08] sm:w-auto sm:px-8 sm:py-6 sm:text-base"
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
