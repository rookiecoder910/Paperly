"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function HeroSection() {
  const shouldReduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  // Animate progress 0→100 in a continuous loop
  useEffect(() => {
    if (shouldReduce) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 30); // ~3s for full cycle
    return () => clearInterval(interval);
  }, [shouldReduce]);

  const wordTransition = (delay: number) => ({
    duration: shouldReduce ? 0.01 : 0.7,
    delay: shouldReduce ? 0 : delay,
    ease: [0.16, 1, 0.3, 1] as const,
  });

  return (
    <section className="relative flex flex-col items-center overflow-hidden px-4 pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-32">
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="pointer-events-none absolute inset-0 noise-overlay" />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(99,102,241,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/12 to-violet-600/12 blur-[80px] sm:h-[600px] sm:w-[600px] lg:h-[800px] lg:w-[800px] lg:blur-[120px] animate-glow-pulse" />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent sm:h-48" />

      {/* Dashboard mockup */}
      <motion.div
        className="relative z-10 w-full max-w-6xl"
        initial={{ opacity: 0, y: shouldReduce ? 0 : 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={wordTransition(0.2)}
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr_260px] lg:gap-5">
          {/* === Left Panel: Handwritten Notes Sidebar === */}
          <motion.div
            className="dashboard-panel rounded-xl p-4 sm:p-5"
            initial={{ opacity: 0, x: shouldReduce ? 0 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={wordTransition(0.4)}
          >
            <h3 className="mb-4 text-sm font-semibold text-foreground/90">Handwritten Notes</h3>

            {/* Folders */}
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Folders</span>
                <svg className="h-3.5 w-3.5 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              <div className="space-y-1.5">
                <div className="rounded-lg bg-indigo-500/20 border border-indigo-500/30 px-3 py-2 text-xs text-indigo-600 dark:text-indigo-300 font-medium">Personal</div>
                <div className="rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-foreground/5 transition-colors">Work</div>
              </div>
            </div>

            {/* Recent Notes */}
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Recent Notes</span>
                <svg className="h-3.5 w-3.5 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              <div className="space-y-1">
                {["Handwritten Notes - ...", "Handwritten Notes - 1...", "Handwritten pages - 1...", "Handwritten pages - 1...", "Handwritten pages - 1..."].map((note, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-muted-foreground/70 hover:bg-foreground/5 transition-colors">
                    <div className="h-1 w-1 rounded-full bg-violet-400/50 flex-shrink-0" />
                    <span className="truncate">{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Tags</span>
                <svg className="h-3.5 w-3.5 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </div>
            </div>
          </motion.div>

          {/* === Center Panel: Handwriting Editor Canvas === */}
          <motion.div
            className="dashboard-panel rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={wordTransition(0.3)}
          >
            {/* Toolbar */}
            <div className="flex items-center gap-1 border-b border-border px-3 py-2 sm:px-4">
              <div className="flex items-center gap-1 mr-3">
                <ToolbarBtn>↩</ToolbarBtn>
                <ToolbarBtn>↪</ToolbarBtn>
              </div>
              <div className="flex items-center gap-0.5 rounded-md border border-border bg-foreground/[0.04] px-2 py-1">
                <span className="text-[10px] text-muted-foreground">Edit</span>
                <svg className="h-3 w-3 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
              <div className="ml-2 flex items-center gap-0.5">
                <ToolbarBtn bold>B</ToolbarBtn>
                <ToolbarBtn italic>I</ToolbarBtn>
                <ToolbarBtn>U</ToolbarBtn>
                <ToolbarBtn>✎</ToolbarBtn>
                <ToolbarBtn>≡</ToolbarBtn>
                <ToolbarBtn>☰</ToolbarBtn>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <ToolbarBtn>⋯</ToolbarBtn>
              </div>
            </div>

            {/* Page canvas */}
            <div className="p-4 sm:p-6">
              <div className="mx-auto aspect-[3/4] max-h-[400px] w-full rounded-lg bg-white shadow-lg shadow-black/20 p-4 sm:p-6">
                <h4 className="mb-3 font-caveat text-lg text-gray-800 sm:text-xl">Handwritten Notes</h4>
                <div className="space-y-2 font-caveat text-[11px] leading-relaxed text-gray-600 sm:text-xs">
                  <p>Handwritten notes at exact a structure had on analytics and quality of facts, which is the diagnosis of results field, chats and learning pages, screenshots and commits, how the function a handwritten pages of product options with the discovering, and manufacturing commint.</p>
                  <div className="my-3 flex items-center justify-center gap-2">
                    <div className="h-12 w-16 rounded bg-gray-200 sm:h-16 sm:w-20" />
                    <div className="text-[9px] text-gray-400 sm:text-[10px]">
                      <p>Handwritten</p>
                      <p>notes pages</p>
                    </div>
                  </div>
                  <p>In combination an engineering to need your handwrites analytics and develop the forms content when is going as harder ease in learn generating the mapping from quality and debates and redevelopment.</p>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-[9px] text-gray-500 sm:text-[10px]">
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">Practice lession</p>
                      <ul className="space-y-0.5 list-disc pl-3">
                        <li>Product to your image</li>
                        <li>Scancted pages</li>
                        <li>PDF splits</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">Learning pages</p>
                      <ul className="space-y-0.5 list-disc pl-3">
                        <li>Product AI engine extract at an</li>
                        <li>processioned</li>
                        <li>Download handwritted pages</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* === Right Panel: OCR & Processing === */}
          <motion.div
            className="dashboard-panel rounded-xl p-4 sm:p-5"
            initial={{ opacity: 0, x: shouldReduce ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={wordTransition(0.5)}
          >
            <h3 className="mb-4 text-sm font-semibold text-foreground/90">OCR & Processing</h3>

            {/* Upload area */}
            <div className="mb-5 rounded-lg border border-dashed border-foreground/15 bg-foreground/[0.02] p-5 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <svg className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              </div>
              <p className="text-xs font-medium text-foreground/70">Upload Document</p>
              <p className="mt-1 text-[10px] text-muted-foreground/60">Drop your image or paste text, or concept there.</p>
            </div>

            {/* Processing progress — animated 0→100% loop */}
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">Processing...</span>
                <span className="text-[11px] text-muted-foreground tabular-nums">{progress}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-foreground/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Extract Text button */}
            <button className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/35">
              Extract Text
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ToolbarBtn({ children, bold, italic }: { children: React.ReactNode; bold?: boolean; italic?: boolean }) {
  return (
    <button className={`flex h-6 w-6 items-center justify-center rounded text-[10px] text-muted-foreground hover:bg-foreground/10 hover:text-foreground/80 transition-colors ${bold ? "font-bold" : ""} ${italic ? "italic" : ""}`}>
      {children}
    </button>
  );
}
