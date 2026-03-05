"use client";

import { type ReactNode, useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
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
  distance = 80,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionOffset(direction, distance) }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
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
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * staggerDelay,
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
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax wrapper ─── */
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({
  children,
  className,
  speed = -0.2,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [speed * 120, -speed * 120]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Floating animation (continuous) ─── */
interface FloatingProps extends MotionProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}

export function Floating({
  children,
  className,
  amplitude = 12,
  duration = 4,
  ...rest
}: FloatingProps) {
  return (
    <motion.div
      className={className}
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
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Animated count-up number ─── */
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
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
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

  return (
    <div ref={ref} className={`overflow-hidden ${className || ""}`}>
      <motion.div
        initial={{ x: direction === "left" ? "-100%" : "100%", opacity: 0 }}
        animate={isInView ? { x: "0%", opacity: 1 } : {}}
        transition={{
          duration: 0.9,
          delay,
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
        className={`rounded-2xl bg-background/80 backdrop-blur-xl sm:rounded-3xl ${className || ""}`}
      >
        {children}
      </div>
    </div>
  );
}
