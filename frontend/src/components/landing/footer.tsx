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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent sm:w-1/2" />

      <FadeIn className="mx-auto max-w-6xl px-4 py-10 sm:py-14 md:py-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="mb-3 flex items-center gap-2 group sm:mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 text-white transition-transform group-hover:scale-105 sm:h-8 sm:w-8 sm:rounded-lg">
                <PenLine className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <span className="text-base font-bold sm:text-lg">Paperly</span>
            </Link>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">
              AI-powered OCR and handwriting generation. Transform your documents effortlessly.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 sm:gap-16">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="mb-3 text-xs font-semibold sm:mb-4 sm:text-sm">{group.title}</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
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
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-5 sm:mt-10 sm:flex-row sm:pt-6">
          <p className="text-[10px] text-muted-foreground sm:text-xs">
            © {new Date().getFullYear()} Paperly. All rights reserved.
          </p>

        </div>
      </FadeIn>
    </footer>
  );
}
