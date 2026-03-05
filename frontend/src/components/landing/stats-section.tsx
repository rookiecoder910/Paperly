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
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/[0.04] via-transparent to-violet-500/[0.04]" />

      <Stagger
        className="relative mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-4 py-12 sm:gap-14 sm:py-16 md:gap-24"
        staggerDelay={0.15}
      >
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm sm:h-14 sm:w-14">
                <s.icon className="h-5 w-5 text-indigo-400 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight sm:text-3xl">
                  <CountUp
                    target={s.value}
                    suffix={s.suffix}
                    prefix={s.prefix || ""}
                    duration={1.5}
                  />
                </p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
