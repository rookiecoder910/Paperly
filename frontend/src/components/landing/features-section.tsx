"use client";

import { type ReactNode } from "react";
import { FadeIn, Parallax, ScaleOnScroll } from "@/components/animations";
import { ScanText, PenLine, FileDown, ArrowRight } from "lucide-react";

interface FeatureBlockProps {
  icon: ReactNode;
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  direction: "left" | "right";
  gradient: string;
  iconBg: string;
  delay?: number;
}

function FeatureBlock({
  icon,
  badge,
  title,
  description,
  highlights,
  direction,
  gradient,
  iconBg,
  delay = 0,
}: FeatureBlockProps) {
  const isLeft = direction === "left";

  return (
    <div
      className={`flex flex-col items-center gap-8 sm:gap-12 lg:flex-row ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* Visual card */}
      <FadeIn
        direction={isLeft ? "left" : "right"}
        delay={delay}
        className="flex-1"
      >
        <ScaleOnScroll>
          <div
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br sm:rounded-3xl ${gradient} p-px`}
          >
            <div className="rounded-2xl bg-background/80 p-6 backdrop-blur-xl sm:rounded-3xl sm:p-8 md:p-12">
              <div className="flex flex-col items-center gap-6 text-center">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-xl sm:h-20 sm:w-20 sm:rounded-2xl ${iconBg}`}
                >
                  {icon}
                </div>
                {/* Placeholder visual lines to represent content */}
                <div className="w-full space-y-3">
                  <div className="mx-auto h-3 w-3/4 rounded-full bg-white/5" />
                  <div className="mx-auto h-3 w-1/2 rounded-full bg-white/5" />
                  <div className="mx-auto h-3 w-2/3 rounded-full bg-white/5" />
                  <div className="mx-auto h-3 w-1/3 rounded-full bg-white/5" />
                </div>
              </div>
            </div>
          </div>
        </ScaleOnScroll>
      </FadeIn>

      {/* Text content */}
      <FadeIn direction={isLeft ? "right" : "left"} delay={delay + 0.15} className="flex-1">
        <div className="max-w-lg text-center lg:text-left">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
            {badge}
          </span>
          <h3 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {title}
          </h3>
          <p className="mb-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
          <ul className="space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-center justify-center gap-3 text-sm text-muted-foreground lg:justify-start">
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-indigo-400" />
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
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:py-24 lg:py-32">
      {/* Section title */}
      <FadeIn className="mb-12 text-center sm:mb-16 lg:mb-24">
        <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Features
        </span>
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Everything You Need
        </h2>
        <p className="mx-auto max-w-xl text-lg text-muted-foreground">
          Two powerful AI tools, one beautifully simple interface. Extract text
          from images and generate handwritten notes effortlessly.
        </p>
      </FadeIn>

      <div className="space-y-20 sm:space-y-28 lg:space-y-40">
        {/* Feature 1: OCR */}
        <FeatureBlock
          icon={<ScanText className="h-10 w-10 text-indigo-400" />}
          badge="OCR Engine"
          title="Image → Text in Seconds"
          description="Upload any image — photos, scanned documents, screenshots — and watch as our AI-powered OCR engine extracts every word with exceptional accuracy."
          highlights={[
            "Support for 50+ languages",
            "Handles handwritten & printed text",
            "Batch processing capability",
          ]}
          direction="left"
          gradient="from-indigo-500/20 to-blue-500/20"
          iconBg="bg-indigo-500/10 border border-indigo-500/20"
        />

        {/* Feature 2: Handwriting */}
        <FeatureBlock
          icon={<PenLine className="h-10 w-10 text-violet-400" />}
          badge="Handwriting AI"
          title="Text → Handwritten Notes"
          description="Transform any typed text into realistic handwritten-style pages. Perfect for assignments, notes, or adding a personal touch to your documents."
          highlights={[
            "Multiple handwriting styles",
            "Natural ink variation",
            "Customizable page layouts",
          ]}
          direction="right"
          gradient="from-violet-500/20 to-purple-500/20"
          iconBg="bg-violet-500/10 border border-violet-500/20"
        />

        {/* Feature 3: Export */}
        <FeatureBlock
          icon={<FileDown className="h-10 w-10 text-purple-400" />}
          badge="Export"
          title="Export to JPG & PDF"
          description="Download your results in high-quality formats ready for sharing, printing, or submitting. One-click export makes it effortless."
          highlights={[
            "High resolution JPG output",
            "Print-ready PDF export",
            "Shareable download links",
          ]}
          direction="left"
          gradient="from-purple-500/20 to-pink-500/20"
          iconBg="bg-purple-500/10 border border-purple-500/20"
        />
      </div>
    </section>
  );
}
