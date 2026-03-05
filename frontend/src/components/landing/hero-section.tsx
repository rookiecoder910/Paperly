"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Floating } from "@/components/animations";
import { ArrowRight, ScanText, PenLine, FileDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-32">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Radial glow */}
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-600/20 blur-[120px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Floating orbs for visual depth */}
      <Floating amplitude={18} duration={6} className="pointer-events-none absolute left-[10%] top-[20%] hidden md:block">
        <div className="h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      </Floating>
      <Floating amplitude={14} duration={5} className="pointer-events-none absolute right-[10%] top-[30%] hidden md:block">
        <div className="h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
      </Floating>

      {/* Content */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
            </span>
            AI-Powered Document Tools
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-center text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          Images to Text.{" "}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
            Text to Handwriting.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
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
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <Button
            asChild
            size="lg"
            className="group gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-6 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-600 hover:to-violet-700"
          >
            <Link href="/signup">
              Start Using Paperly
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="rounded-full border-white/10 bg-white/5 px-8 py-6 text-base backdrop-blur-sm hover:bg-white/10"
          >
            <Link href="/login">Log In</Link>
          </Button>
        </motion.div>

        {/* Floating mini-cards preview */}
        <motion.div
          className="mt-12 flex items-center gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Floating amplitude={8} duration={3.5}>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-md sm:h-20 sm:w-20">
              <ScanText className="h-7 w-7 text-indigo-400 sm:h-8 sm:w-8" />
            </div>
          </Floating>
          <Floating amplitude={10} duration={4}>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-md sm:h-20 sm:w-20">
              <PenLine className="h-7 w-7 text-violet-400 sm:h-8 sm:w-8" />
            </div>
          </Floating>
          <Floating amplitude={6} duration={4.5}>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-md sm:h-20 sm:w-20">
              <FileDown className="h-7 w-7 text-purple-400 sm:h-8 sm:w-8" />
            </div>
          </Floating>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
            Scroll
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-muted-foreground/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
