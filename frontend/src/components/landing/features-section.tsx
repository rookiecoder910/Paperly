"use client";

import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const isLeft = direction === "left";

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-10 sm:gap-14 lg:flex-row lg:gap-20 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
    >
      {/* Visual card */}
      <FadeIn
        direction={isLeft ? "left" : "right"}
        duration={1}
        distance={100}
        className="flex-1 w-full"
      >
        <GradientBorder
          className="p-8 sm:p-10 md:p-14"
          borderClassName={`bg-gradient-to-br ${gradient}`}
        >
          <div className="flex flex-col items-center gap-8 text-center">
            {/* Icon with glow */}
            <div className="relative">
              <div className={`absolute inset-0 rounded-2xl ${iconGlow} blur-xl`} />
              <motion.div
                style={{ y }}
                className={`relative flex h-20 w-20 items-center justify-center rounded-2xl ${iconBg} border border-white/10 sm:h-24 sm:w-24`}
              >
                {icon}
              </motion.div>
            </div>
            {/* Decorative content lines */}
            <div className="w-full space-y-3 max-w-xs">
              <div className="mx-auto h-2.5 w-3/4 rounded-full bg-white/[0.04]" />
              <div className="mx-auto h-2.5 w-1/2 rounded-full bg-white/[0.04]" />
              <div className="mx-auto h-2.5 w-2/3 rounded-full bg-white/[0.04]" />
              <div className="mx-auto h-2.5 w-2/5 rounded-full bg-white/[0.04]" />
            </div>
          </div>
        </GradientBorder>
      </FadeIn>

      {/* Text content */}
      <FadeIn
        direction={isLeft ? "right" : "left"}
        delay={0.15}
        duration={1}
        distance={100}
        className="flex-1"
      >
        <div className="max-w-lg text-center lg:text-left">
          <span className="mb-5 inline-block rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
            {badge}
          </span>
          <h3 className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl">
            {title}
          </h3>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
          <ul className="space-y-4">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center justify-center gap-3 text-sm text-muted-foreground lg:justify-start sm:text-base"
              >
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/10">
                  <ArrowRight className="h-3 w-3 text-indigo-400" />
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
    <section className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:py-28 lg:py-36">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      {/* Section title */}
      <FadeIn className="mb-16 text-center sm:mb-24 lg:mb-32">
        <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Features
        </span>
        <h2 className="mb-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Everything You Need
        </h2>
        <p className="mx-auto max-w-xl text-lg text-muted-foreground">
          Two powerful AI tools, one beautifully simple interface. Extract text
          from images and generate handwritten notes effortlessly.
        </p>
      </FadeIn>

      <div className="space-y-28 sm:space-y-36 lg:space-y-48">
        {/* Feature 1: OCR */}
        <FeatureShowcase
          icon={<ScanText className="h-10 w-10 text-indigo-400 sm:h-12 sm:w-12" />}
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
          icon={<PenLine className="h-10 w-10 text-violet-400 sm:h-12 sm:w-12" />}
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
          icon={<FileDown className="h-10 w-10 text-purple-400 sm:h-12 sm:w-12" />}
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
