"use client";

import { FadeIn, CountUp, Stagger, StaggerItem } from "@/components/animations";
import { Zap, Shield, Globe } from "lucide-react";

const stats = [
  { icon: Zap, label: "Fast Processing", value: 2, suffix: "s", prefix: "< " },
  { icon: Shield, label: "Secure & Private", value: 100, suffix: "%" },
  { icon: Globe, label: "Languages Supported", value: 50, suffix: "+" },
];

export function StatsSection() {
  return (
    <section className="relative border-y border-white/[0.06]">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/[0.03] via-transparent to-violet-500/[0.03]" />

      <Stagger
        className="relative mx-auto flex max-w-5xl flex-col items-center justify-center gap-6 px-4 py-10 sm:flex-row sm:flex-wrap sm:gap-10 sm:py-14 md:gap-20 md:py-16"
        staggerDelay={0.12}
      >
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] sm:h-12 sm:w-12 sm:rounded-xl md:h-14 md:w-14">
                <s.icon className="h-4 w-4 text-indigo-400 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                  <CountUp
                    target={s.value}
                    suffix={s.suffix}
                    prefix={s.prefix || ""}
                    duration={1.2}
                  />
                </p>
                <p className="text-xs text-muted-foreground sm:text-sm">{s.label}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
