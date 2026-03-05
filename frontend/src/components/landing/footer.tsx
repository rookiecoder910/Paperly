"use client";

import Link from "next/link";
import { PenLine } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
            <PenLine className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-semibold">Paperly</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Paperly. All rights reserved.
        </p>
       
      </div>
    </footer>
  );
}
