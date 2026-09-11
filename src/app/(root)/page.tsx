import AnalyzerForm from "@/features/analyzer/components/analyzer-form";
import HeroSection from "@/components//shared/hero-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="relative">
        <HeroSection />
        <AnalyzerForm />
      </div>
    </main>
  );
}