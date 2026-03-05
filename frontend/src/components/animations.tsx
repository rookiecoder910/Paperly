"use client";

import { type ReactNode, useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionProps,
} from "framer-motion";

/* ─── Fade-in on scroll (Intersection Observer) ─── */
interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  distance?: number;
}

const directionOffset = (d: string, dist: number) => {
  switch (d) {
    case "up":
      return { y: dist };
    case "down":
      return { y: -dist };
    case "left":
      return { x: dist };
    case "right":
      return { x: -dist };
    default:
      return {};
  }
};

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
  once = true,
  distance = 60,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  // Reduce distance on mobile for smoother perf
  const effectiveDistance = shouldReduce ? 0 : distance;
  const effectiveDuration = shouldReduce ? 0.01 : duration;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ willChange: "transform, opacity" }}
      initial={{ opacity: 0, ...directionOffset(direction, effectiveDistance) }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: effectiveDuration, delay: shouldReduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Text Reveal — word-by-word stagger animation ─── */
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function TextReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.04,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });
  const shouldReduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            style={{ willChange: "transform" }}
            initial={{ y: shouldReduce ? "0%" : "100%", opacity: shouldReduce ? 1 : 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: shouldReduce ? 0.01 : 0.6,
              delay: shouldReduce ? 0 : delay + i * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}

/* ─── Staggered children container ─── */
interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function Stagger({
  children,
  className,
  staggerDelay = 0.12,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={{ willChange: "transform, opacity" }}
      variants={{
        hidden: { opacity: 0, y: shouldReduce ? 0 : 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: shouldReduce ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax wrapper (disabled on mobile for performance) ─── */
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({
  children,
  className,
  speed = -0.15,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [speed * 80, -speed * 80]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Floating animation (continuous, GPU-accelerated) ─── */
interface FloatingProps extends MotionProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}

export function Floating({
  children,
  className,
  amplitude = 10,
  duration = 4,
  ...rest
}: FloatingProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ willChange: "transform" }}
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ─── Scale on scroll ─── */
interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
}

export function ScaleOnScroll({ children, className }: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated count-up number (uses rAF instead of setInterval) ─── */
interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ─── Slide Reveal — horizontal mask reveal ─── */
interface SlideRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  delay?: number;
}

export function SlideReveal({
  children,
  className,
  direction = "left",
  delay = 0,
}: SlideRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <div ref={ref} className={`overflow-hidden ${className || ""}`}>
      <motion.div
        style={{ willChange: "transform, opacity" }}
        initial={{
          x: shouldReduce ? "0%" : direction === "left" ? "-100%" : "100%",
          opacity: shouldReduce ? 1 : 0,
        }}
        animate={isInView ? { x: "0%", opacity: 1 } : {}}
        transition={{
          duration: shouldReduce ? 0.01 : 0.8,
          delay: shouldReduce ? 0 : delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Gradient Border glow wrapper ─── */
interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  borderClassName?: string;
}

export function GradientBorder({
  children,
  className,
  borderClassName,
}: GradientBorderProps) {
  return (
    <div
      className={`relative rounded-2xl p-px sm:rounded-3xl ${borderClassName || "bg-gradient-to-br from-indigo-500/30 via-violet-500/30 to-purple-500/30"}`}
    >
      <div
        className={`rounded-2xl bg-background/80 backdrop-blur-md sm:rounded-3xl ${className || ""}`}
      >
        {children}
      </div>
    </div>
  );
}
