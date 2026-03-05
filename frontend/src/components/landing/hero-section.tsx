"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Floating } from "@/components/animations";
import { ArrowRight, ScanText, PenLine, FileDown, Sparkles } from "lucide-react";
import { useRef } from "react";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const headlineWords1 = ["Images", "to", "Text."];
  const headlineWords2 = ["Text", "to", "Handwriting."];

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16 sm:pt-24 sm:pb-32"
    >
      {/* Animated gradient mesh background */}
      <motion.div
        className="pointer-events-none absolute inset-0 gradient-mesh"
        style={{ y: bgY }}
      />

      {/* Noise overlay */}
      <div className="pointer-events-none absolute inset-0 noise-overlay" />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(99,102,241,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Large radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/15 to-violet-600/15 blur-[100px] sm:h-[700px] sm:w-[700px] sm:blur-[140px] animate-glow-pulse" />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />

      {/* Floating orbs */}
      <Floating
        amplitude={20}
        duration={7}
        className="pointer-events-none absolute left-[8%] top-[18%] hidden lg:block"
      >
        <div className="h-80 w-80 rounded-full bg-indigo-500/8 blur-3xl" />
      </Floating>
      <Floating
        amplitude={16}
        duration={5.5}
        className="pointer-events-none absolute right-[8%] top-[28%] hidden lg:block"
      >
        <div className="h-60 w-60 rounded-full bg-violet-500/8 blur-3xl" />
      </Floating>
      <Floating
        amplitude={12}
        duration={9}
        className="pointer-events-none absolute left-[30%] bottom-[15%] hidden lg:block"
      >
        <div className="h-40 w-40 rounded-full bg-purple-500/6 blur-3xl" />
      </Floating>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            AI-Powered Document Tools
          </span>
        </motion.div>

        {/* Headline — word by word stagger */}
        <div className="text-center text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <div className="overflow-hidden">
            {headlineWords1.map((word, i) => (
              <motion.span
                key={`h1-${i}`}
                className="inline-block mr-[0.25em]"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden">
            {headlineWords2.map((word, i) => (
              <motion.span
                key={`h2-${i}`}
                className="inline-block mr-[0.25em] bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.65 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subheading */}
        <motion.p
          className="max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Paperly uses advanced AI to extract text from images and transform
          typed content into natural handwritten-style notes — all in one
          beautifully simple app.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            asChild
            size="lg"
            className="group relative gap-2 overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-7 py-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/35 hover:from-indigo-600 hover:to-violet-700 sm:px-9 sm:py-7 sm:text-base"
          >
            <Link href="/signup">
              <span className="relative z-10 flex items-center gap-2">
                Start Using Paperly
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="rounded-full border-white/10 bg-white/[0.04] px-7 py-6 text-sm backdrop-blur-sm transition-all hover:bg-white/[0.08] hover:border-white/15 sm:px-9 sm:py-7 sm:text-base"
          >
            <Link href="/login">Log In</Link>
          </Button>
        </motion.div>

        {/* Floating feature cards */}
        <motion.div
          className="mt-10 flex items-center gap-5 sm:mt-14 sm:gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            {
              icon: ScanText,
              color: "text-indigo-400",
              label: "OCR",
              delay: 3.5,
            },
            {
              icon: PenLine,
              color: "text-violet-400",
              label: "Handwriting",
              delay: 4,
            },
            {
              icon: FileDown,
              color: "text-purple-400",
              label: "Export",
              delay: 4.5,
            },
          ].map((item) => (
            <Floating key={item.label} amplitude={8} duration={item.delay}>
              <div className="group flex flex-col items-center gap-2">
                <div className="glass-card flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg transition-all group-hover:scale-105 group-hover:border-white/15 sm:h-20 sm:w-20 sm:rounded-2xl">
                  <item.icon
                    className={`h-7 w-7 sm:h-8 sm:w-8 ${item.color}`}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground/60">
                  {item.label}
                </span>
              </div>
            </Floating>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/40">
            Scroll
          </span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-muted-foreground/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
