"use client";

import { FadeIn } from "@/components/animations";

interface FeatureCardProps {
  title: string;
  description: string;
  bullets?: string[];
}

function FeatureCard({ title, description, bullets }: FeatureCardProps) {
  return (
    <div className="dashboard-panel rounded-xl p-6 sm:p-8 transition-transform hover:scale-[1.02]">
      <h3 className="mb-3 text-lg font-bold tracking-tight text-white/90 sm:text-xl">
        {title}
      </h3>
      <p className="mb-4 text-xs leading-relaxed text-white/50 sm:text-sm">
        {description}
      </p>
      {bullets && bullets.length > 0 && (
        <ul className="space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs text-white/40 sm:text-sm">
              <span className="mt-1 h-1 w-1 rounded-full bg-violet-400/60 flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:py-24 lg:py-32">
      <FadeIn>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
          <FeatureCard
            title="IMAGE → TEXT IN SECONDS"
            description="Drop your image or paste text. We accept photos, scans, screenshots, &amp; more."
            bullets={[]}
          />
          <FeatureCard
            title="TEXT → LARGEST"
            description=""
            bullets={[
              "Neon AI engine extracts fine text",
              "Extracts text or generates realistic handwritten pages",
            ]}
          />
          <FeatureCard
            title="TEXT → HANDWRITTEN NOTES"
            description="Our AI engine extracts text or generates realistic handwritten pages in seconds."
            bullets={["Product your Image", "Handwritten pages"]}
          />
          <FeatureCard
            title="EXPORT TO JPG & PDF"
            description="Export results as high quality JPG or print ready PDF in one click."
            bullets={[
              "Easy to fit alternation",
              "Export to JPG & PDF",
              "Get uploads to JPG & PDF",
            ]}
          />
        </div>
      </FadeIn>
    </section>
  );
}
