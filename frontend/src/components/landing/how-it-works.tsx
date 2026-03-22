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
        <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:py-24 lg:py-36">
            {/* Section header */}
            <FadeIn className="mb-10 text-center sm:mb-16 lg:mb-20">
                <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-violet-400 sm:mb-4 sm:px-4 sm:text-xs">
                    How It Works
                </span>
                <h2 className="mb-3 text-2xl font-bold tracking-tight sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
                    Three Simple Steps
                </h2>
                <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg">
                    From upload to download in under 30 seconds. No complicated setup required.
                </p>
            </FadeIn>

            {/* Steps */}
            <Stagger className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:gap-10" staggerDelay={0.12}>
                {/* Connecting line (desktop only) */}
                <div className="pointer-events-none absolute top-1/2 left-[16.67%] right-[16.67%] hidden -translate-y-1/2 md:block">
                    <div className="h-px w-full bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20" />
                    <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400 shadow-md shadow-indigo-400/40" />
                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400 shadow-md shadow-violet-400/40" />
                    <div className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400 shadow-md shadow-purple-400/40" />
                </div>

                {steps.map((step, i) => (
                    <StaggerItem key={step.title}>
                        <GradientBorder
                            className="p-5 sm:p-6 md:p-8 text-center h-full"
                            borderClassName={`bg-gradient-to-br ${step.glow}`}
                        >
                            {/* Step number */}
                            <div className="mb-4 inline-flex items-center justify-center sm:mb-5">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-bold text-muted-foreground sm:h-8 sm:w-8 sm:text-xs">
                                    {i + 1}
                                </span>
                            </div>

                            {/* Icon */}
                            <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${step.iconBg} border border-white/10 sm:mb-5 sm:h-14 sm:w-14 sm:rounded-xl`}>
                                <step.icon className={`h-6 w-6 ${step.color} sm:h-7 sm:w-7`} />
                            </div>

                            {/* Text */}
                            <h3 className="mb-2 text-lg font-bold sm:mb-3 sm:text-xl">{step.title}</h3>
                            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                {step.description}
                            </p>
                        </GradientBorder>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}
