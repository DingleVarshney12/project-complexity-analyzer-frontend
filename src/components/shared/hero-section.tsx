import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <div className="status-badge gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Project Analysis
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-glow text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
          Analyze Your
          <br />
          <span className="gradient-text">Project Complexity</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Understand how technically complex your project is, what makes it
          difficult, and what skills and technologies you&apos;ll need.
        </p>
      </div>
    </section>
  );
}
