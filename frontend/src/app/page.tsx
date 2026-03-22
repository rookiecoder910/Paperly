import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
}