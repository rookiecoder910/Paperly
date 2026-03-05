"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/15 to-violet-600/15 blur-[100px]" />
      </div>

      <FadeIn className="relative mx-auto max-w-3xl px-4 text-center">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:rounded-3xl sm:p-12 lg:p-16">
          <Sparkles className="mx-auto mb-6 h-10 w-10 text-indigo-400" />
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Ready to Transform{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Your Documents?
            </span>
          </h2>
          <p className="mx-auto mb-6 max-w-lg text-base text-muted-foreground sm:mb-8 sm:text-lg">
            Sign up for free and start converting images to text and generating
            handwritten notes in seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="group gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-600 hover:to-violet-700 sm:px-8 sm:py-6 sm:text-base"
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
              className="rounded-full border-white/10 bg-white/5 px-6 py-5 text-sm backdrop-blur-sm hover:bg-white/10 sm:px-8 sm:py-6 sm:text-base"
            >
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
