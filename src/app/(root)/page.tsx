import AnalyzerSection from "@/features/analyzer/components/analyzer-section";
import HeroSection from "@/components/shared/hero-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="relative">
        <HeroSection />
        <AnalyzerSection />
      </div>
    </main>
  );
}
