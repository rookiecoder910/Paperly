"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Don't initialize Lenis for reduced motion users
      return () => window.removeEventListener("resize", checkMobile);
    }

    const lenis = new Lenis({
      duration: isMobile ? 1.2 : 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      smoothWheel: true,
      lerp: isMobile ? 0.12 : 0.08,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  return null;
}
