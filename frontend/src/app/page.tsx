import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ScanText,
  PenLine,
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: ScanText,
    title: "AI-Powered OCR",
    description:
      "Upload any image and instantly extract text with high accuracy using advanced optical character recognition.",
  },
  {
    icon: PenLine,
    title: "Handwritten Notes",
    description:
      "Convert typed text into beautiful handwritten-style pages you can download and share.",
  },
  {
    icon: Sparkles,
    title: "Smart Processing",
    description:
      "Powered by intelligent AI models for accurate recognition and natural-looking handwriting generation.",
  },
];

const stats = [
  { icon: Zap, label: "Fast Processing", value: "< 2s" },
  { icon: Shield, label: "Secure & Private", value: "100%" },
  { icon: Globe, label: "Languages Supported", value: "50+" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative flex flex-1 flex-col items-center justify-center px-4 pt-20 pb-32 text-center">
        {/* Background grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(99,102,241,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium shadow-sm">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            AI-Powered Document Tools
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Images to Text.{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
              Text to Handwriting.
            </span>
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground">
            Paperly uses advanced AI to extract text from images and transform
            typed content into natural handwritten-style notes — all in one
            place.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg hover:from-indigo-600 hover:to-violet-700"
            >
              <Link href="/signup">
                Start Using Paperly
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 px-4 py-10 sm:gap-16">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <s.icon className="h-5 w-5 text-indigo-500" />
              </div>
              <div>
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-4 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Everything You Need
          </h2>
          <p className="mt-3 text-muted-foreground">
            Two powerful tools, one simple interface.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card
              key={f.title}
              className="group transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white transition-transform group-hover:scale-110">
                  <f.icon className="h-6 w-6" />
                </div>
                <CardTitle>{f.title}</CardTitle>
                <CardDescription className="pt-1">
                  {f.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Transform Your Documents?
          </h2>
          <p className="text-indigo-100">
            Sign up for free and start converting images to text and generating
            handwritten notes in seconds.
          </p>
          <Button
            asChild
            size="lg"
            className="gap-2 bg-white text-indigo-600 shadow-lg hover:bg-indigo-50"
          >
            <Link href="/signup">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Paperly. All rights reserved.</p>
          <p>Built with AI ✨</p>
        </div>
      </footer>
    </div>
  );
}