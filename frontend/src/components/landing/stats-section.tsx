"use client";

import { FadeIn, Stagger, StaggerItem } from "@/components/animations";
import { Zap, Shield, Globe } from "lucide-react";

const stats = [
  { icon: Zap, label: "Fast Processing", value: "< 2s" },
  { icon: Shield, label: "Secure & Private", value: "100%" },
  { icon: Globe, label: "Languages Supported", value: "50+" },
];

export function StatsSection() {
  return (
    <section className="relative border-y border-white/5">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-violet-500/5" />

      <Stagger className="relative mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 px-4 py-10 sm:gap-10 sm:py-14 md:gap-20">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <s.icon className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
