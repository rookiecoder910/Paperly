"use client";

import Link from "next/link";
import { PenLine } from "lucide-react";
import { FadeIn } from "@/components/animations";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "OCR Tool", href: "/dashboard" },
      { label: "Handwriting Generator", href: "/dashboard" },
      { label: "Export", href: "/dashboard" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign Up", href: "/signup" },
      { label: "Log In", href: "/login" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      {/* Gradient separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <FadeIn className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="mb-4 flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white transition-transform group-hover:scale-105">
                <PenLine className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold">Paperly</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              AI-powered OCR and handwriting generation. Transform your documents effortlessly.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="mb-4 text-sm font-semibold">{group.title}</h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Paperly. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Built with AI ✦ Made for productivity
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}
