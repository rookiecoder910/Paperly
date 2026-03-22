"use client";

import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FadeIn, GradientBorder } from "@/components/animations";
import { ScanText, PenLine, FileDown, ArrowRight } from "lucide-react";

interface FeatureShowcaseProps {
  icon: ReactNode;
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  direction: "left" | "right";
  gradient: string;
  iconBg: string;
  iconGlow: string;
}

function FeatureShowcase({
  icon,
  badge,
  title,
  description,
  highlights,
  direction,
  gradient,
  iconBg,
  iconGlow,
}: FeatureShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Only apply parallax on desktop — skip on reduced motion
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const isLeft = direction === "left";

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-8 sm:gap-12 lg:flex-row lg:gap-16 xl:gap-20 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
    >
      {/* Visual card */}
      <FadeIn
        direction={isLeft ? "left" : "right"}
        duration={0.8}
        distance={50}
        className="flex-1 w-full"
      >
        <GradientBorder
          className="p-6 sm:p-8 md:p-12"
          borderClassName={`bg-gradient-to-br ${gradient}`}
        >
          <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
            {/* Icon with glow — glow hidden on mobile */}
            <div className="relative">
              <div className={`absolute inset-0 rounded-2xl ${iconGlow} blur-lg hidden sm:block`} />
              <motion.div
                style={shouldReduce ? {} : { y, willChange: "transform" }}
                className={`relative flex h-16 w-16 items-center justify-center rounded-xl ${iconBg} border border-white/10 sm:h-20 sm:w-20 sm:rounded-2xl md:h-24 md:w-24`}
              >
                {icon}
              </motion.div>
            </div>
            {/* Decorative content lines */}
            <div className="w-full space-y-2.5 max-w-xs sm:space-y-3">
              <div className="mx-auto h-2 w-3/4 rounded-full bg-white/[0.04] sm:h-2.5" />
              <div className="mx-auto h-2 w-1/2 rounded-full bg-white/[0.04] sm:h-2.5" />
              <div className="mx-auto h-2 w-2/3 rounded-full bg-white/[0.04] sm:h-2.5" />
              <div className="mx-auto h-2 w-2/5 rounded-full bg-white/[0.04] sm:h-2.5" />
            </div>
          </div>
        </GradientBorder>
      </FadeIn>

      {/* Text content */}
      <FadeIn
        direction={isLeft ? "right" : "left"}
        delay={0.1}
        duration={0.8}
        distance={50}
        className="flex-1"
      >
        <div className="max-w-lg text-center lg:text-left">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-400 sm:mb-5 sm:px-4 sm:text-xs">
            {badge}
          </span>
          <h3 className="mb-4 text-xl font-bold tracking-tight sm:mb-5 sm:text-2xl md:text-3xl lg:text-4xl">
            {title}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:mb-8 sm:text-base md:text-lg">
            {description}
          </p>
          <ul className="space-y-3 sm:space-y-4">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center justify-center gap-2.5 text-xs text-muted-foreground lg:justify-start sm:gap-3 sm:text-sm md:text-base"
              >
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/10 sm:h-6 sm:w-6">
                  <ArrowRight className="h-2.5 w-2.5 text-indigo-400 sm:h-3 sm:w-3" />
                </div>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:py-24 lg:py-36">
      {/* Background decoration — hidden on mobile */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent hidden sm:block" />

      {/* Section title */}
      <FadeIn className="mb-12 text-center sm:mb-20 lg:mb-28">
        <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-400 sm:mb-4 sm:px-4 sm:text-xs">
          Features
        </span>
        <h2 className="mb-4 text-2xl font-bold tracking-tight sm:mb-5 sm:text-3xl md:text-4xl lg:text-5xl">
          Everything You Need
        </h2>
        <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg">
          Two powerful AI tools, one beautifully simple interface. Extract text
          from images and generate handwritten notes effortlessly.
        </p>
      </FadeIn>

      <div className="space-y-16 sm:space-y-24 md:space-y-32 lg:space-y-44">
        {/* Feature 1: OCR */}
        <FeatureShowcase
          icon={<ScanText className="h-8 w-8 text-indigo-400 sm:h-10 sm:w-10 md:h-12 md:w-12" />}
          badge="OCR Engine"
          title="Image → Text in Seconds"
          description="Upload any image — photos, scanned documents, screenshots — and watch as our AI-powered OCR engine extracts every word with exceptional accuracy."
          highlights={[
            "Support for 50+ languages",
            "Handles handwritten & printed text",
            "Batch processing capability",
          ]}
          direction="left"
          gradient="from-indigo-500/20 via-blue-500/10 to-indigo-500/5"
          iconBg="bg-indigo-500/10"
          iconGlow="bg-indigo-500/20"
        />

        {/* Feature 2: Handwriting */}
        <FeatureShowcase
          icon={<PenLine className="h-8 w-8 text-violet-400 sm:h-10 sm:w-10 md:h-12 md:w-12" />}
          badge="Handwriting AI"
          title="Text → Handwritten Notes"
          description="Transform any typed text into realistic handwritten-style pages. Perfect for assignments, notes, or adding a personal touch to your documents."
          highlights={[
            "Multiple handwriting styles",
            "Natural ink variation",
            "Customizable page layouts",
          ]}
          direction="right"
          gradient="from-violet-500/20 via-purple-500/10 to-violet-500/5"
          iconBg="bg-violet-500/10"
          iconGlow="bg-violet-500/20"
        />

        {/* Feature 3: Export */}
        <FeatureShowcase
          icon={<FileDown className="h-8 w-8 text-purple-400 sm:h-10 sm:w-10 md:h-12 md:w-12" />}
          badge="Export"
          title="Export to JPG & PDF"
          description="Download your results in high-quality formats ready for sharing, printing, or submitting. One-click export makes it effortless."
          highlights={[
            "High resolution JPG output",
            "Print-ready PDF export",
            "Shareable download links",
          ]}
          direction="left"
          gradient="from-purple-500/20 via-pink-500/10 to-purple-500/5"
          iconBg="bg-purple-500/10"
          iconGlow="bg-purple-500/20"
        />
      </div>
    </section>
  );
}
