import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paperly — AI-Powered OCR & Handwriting Generator",
  description:
    "Convert images to text with AI-powered OCR and generate beautiful handwritten-style notes from typed text.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${caveat.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <SmoothScroll />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
