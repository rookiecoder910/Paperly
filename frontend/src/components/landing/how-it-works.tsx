"use client";

import { FadeIn, Stagger, StaggerItem, GradientBorder } from "@/components/animations";
import { Upload, Cpu, Download } from "lucide-react";

const steps = [
    {
        icon: Upload,
        title: "Upload",
        description: "Drop your image or paste text — we accept photos, scans, screenshots, and typed content.",
        color: "text-indigo-400",
        glow: "from-indigo-500/20 to-indigo-500/5",
        iconBg: "bg-indigo-500/10",
    },
    {
        icon: Cpu,
        title: "Process",
        description: "Our AI engine extracts text with OCR or generates realistic handwritten pages in seconds.",
        color: "text-violet-400",
        glow: "from-violet-500/20 to-violet-500/5",
        iconBg: "bg-violet-500/10",
    },
    {
        icon: Download,
        title: "Download",
        description: "Export your results as high-quality JPG or print-ready PDF — one click, done.",
        color: "text-purple-400",
        glow: "from-purple-500/20 to-purple-500/5",
        iconBg: "bg-purple-500/10",
    },
];

export function HowItWorks() {
    return (
        <section className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:py-28 lg:py-36">
            {/* Section header */}
            <FadeIn className="mb-14 text-center sm:mb-20">
                <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
                    How It Works
                </span>
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Three Simple Steps
                </h2>
                <p className="mx-auto max-w-xl text-lg text-muted-foreground">
                    From upload to download in under 30 seconds. No complicated setup required.
                </p>
            </FadeIn>

            {/* Steps */}
            <Stagger className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10" staggerDelay={0.15}>
                {/* Connecting line (desktop) */}
                <div className="pointer-events-none absolute top-1/2 left-[16.67%] right-[16.67%] hidden -translate-y-1/2 md:block">
                    <div className="h-px w-full bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20" />
                    {/* Glowing dots on the line */}
                    <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50" />
                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50" />
                    <div className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
                </div>

                {steps.map((step, i) => (
                    <StaggerItem key={step.title}>
                        <GradientBorder
                            className="p-6 sm:p-8 text-center h-full"
                            borderClassName={`bg-gradient-to-br ${step.glow}`}
                        >
                            {/* Step number */}
                            <div className="mb-5 inline-flex items-center justify-center">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-xs font-bold text-muted-foreground">
                                    {i + 1}
                                </span>
                            </div>

                            {/* Icon */}
                            <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${step.iconBg} border border-white/10`}>
                                <step.icon className={`h-7 w-7 ${step.color}`} />
                            </div>

                            {/* Text */}
                            <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {step.description}
                            </p>
                        </GradientBorder>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}
