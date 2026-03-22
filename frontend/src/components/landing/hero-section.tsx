"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Floating } from "@/components/animations";
import { ArrowRight, ScanText, PenLine, FileDown, Sparkles } from "lucide-react";
import { useRef } from "react";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const headlineWords1 = ["Images", "to", "Text."];
  const headlineWords2 = ["Text", "to", "Handwriting."];

  const wordTransition = (delay: number) => ({
    duration: shouldReduce ? 0.01 : 0.7,
    delay: shouldReduce ? 0 : delay,
    ease: [0.16, 1, 0.3, 1] as const,
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16 sm:pt-24 sm:pb-32"
    >
      {/* Gradient mesh background with parallax */}
      <motion.div
        className="pointer-events-none absolute inset-0 gradient-mesh"
        style={{ y: shouldReduce ? 0 : bgY, willChange: "transform" }}
      />

      {/* Noise overlay (hidden on mobile via CSS) */}
      <div className="pointer-events-none absolute inset-0 noise-overlay" />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(99,102,241,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Radial glow — smaller & less blur on mobile */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/12 to-violet-600/12 blur-[60px] sm:h-[500px] sm:w-[500px] sm:blur-[80px] lg:h-[700px] lg:w-[700px] lg:blur-[120px] animate-glow-pulse" />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent sm:h-48" />

      {/* Floating orbs — desktop only */}
      <Floating
        amplitude={16}
        duration={7}
        className="pointer-events-none absolute left-[8%] top-[18%] hidden lg:block"
      >
        <div className="h-64 w-64 rounded-full bg-indigo-500/[0.06] blur-2xl xl:h-80 xl:w-80 xl:blur-3xl" />
      </Floating>
      <Floating
        amplitude={12}
        duration={5.5}
        className="pointer-events-none absolute right-[8%] top-[28%] hidden lg:block"
      >
        <div className="h-48 w-48 rounded-full bg-violet-500/[0.06] blur-2xl xl:h-60 xl:w-60 xl:blur-3xl" />
      </Floating>

      {/* Content */}
      <motion.div
        style={shouldReduce ? {} : { opacity: contentOpacity, willChange: "opacity" }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-5 sm:gap-8"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={wordTransition(0.2)}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-sm sm:gap-2.5 sm:px-5 sm:py-2.5 sm:text-sm">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400 sm:h-4 sm:w-4" />
            AI-Powered Document Tools
          </span>
        </motion.div>

        {/* Headline — word by word stagger */}
        <div className="text-center text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <div className="overflow-hidden">
            {headlineWords1.map((word, i) => (
              <motion.span
                key={`h1-${i}`}
                className="inline-block mr-[0.2em] sm:mr-[0.25em]"
                style={{ willChange: "transform" }}
                initial={{ y: shouldReduce ? "0%" : "100%", opacity: shouldReduce ? 1 : 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={wordTransition(0.35 + i * 0.07)}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden">
            {headlineWords2.map((word, i) => (
              <motion.span
                key={`h2-${i}`}
                className="inline-block mr-[0.2em] sm:mr-[0.25em] bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent"
                style={{ willChange: "transform" }}
                initial={{ y: shouldReduce ? "0%" : "100%", opacity: shouldReduce ? 1 : 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={wordTransition(0.55 + i * 0.07)}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subheading */}
        <motion.p
          className="max-w-2xl px-2 text-center text-sm leading-relaxed text-muted-foreground sm:px-0 sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={wordTransition(0.8)}
        >
          Paperly uses advanced AI to extract text from images and transform
          typed content into natural handwritten-style notes — all in one
          beautifully simple app.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex w-full flex-col items-center gap-3 pt-2 sm:w-auto sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={wordTransition(1.0)}
        >
          <Button
            asChild
            size="lg"
            className="group w-full gap-2 overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-shadow hover:shadow-xl hover:shadow-indigo-500/35 sm:w-auto sm:px-8 sm:py-6 sm:text-base"
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
            className="w-full rounded-full border-white/10 bg-white/[0.04] px-6 py-5 text-sm backdrop-blur-sm transition-colors hover:bg-white/[0.08] sm:w-auto sm:px-8 sm:py-6 sm:text-base"
          >
            <Link href="/login">Log In</Link>
          </Button>
        </motion.div>

        {/* Floating feature cards — hidden on very small screens */}
        <motion.div
          className="mt-8 hidden items-center gap-5 xs:flex sm:mt-12 sm:gap-8"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={wordTransition(1.2)}
        >
          {[
            { icon: ScanText, color: "text-indigo-400", label: "OCR", dur: 3.5 },
            { icon: PenLine, color: "text-violet-400", label: "Handwriting", dur: 4 },
            { icon: FileDown, color: "text-purple-400", label: "Export", dur: 4.5 },
          ].map((item) => (
            <Floating key={item.label} amplitude={6} duration={item.dur}>
              <div className="group flex flex-col items-center gap-2">
                <div className="glass-card flex h-14 w-14 items-center justify-center rounded-xl shadow-md transition-transform group-hover:scale-105 sm:h-18 sm:w-18 sm:rounded-2xl md:h-20 md:w-20">
                  <item.icon className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${item.color}`} />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground/60 sm:text-xs">
                  {item.label}
                </span>
              </div>
            </Floating>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — hidden on mobile */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block sm:bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldReduce ? 0 : 1.8, duration: shouldReduce ? 0.01 : 1 }}
      >
        <motion.div
          animate={shouldReduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/40">
            Scroll
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-muted-foreground/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
