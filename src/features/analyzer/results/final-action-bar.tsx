import Link from "next/link";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";

export default function FinalActionBar() {
  return (
    <section className="px-5 pb-16 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-card-strong relative overflow-hidden p-6 sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-400" />

                <span className="text-sm font-medium text-blue-400">
                  Analysis Complete
                </span>
              </div>

              <h2 className="mt-3 text-xl font-semibold">
                Ready to analyze another project?
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Start a new analysis and get another AI-powered complexity
                assessment.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Analyzer
              </Link>

              <Link
                href="/"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Analyze New Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
