import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

import type { ProjectResponse } from "@/lib/types";

interface ResultHeaderProps {
  result: ProjectResponse;
}

export default function ResultHeader({
  result,
}: ResultHeaderProps) {
  return (
    <section className="px-5 pb-8 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Analyzer
        </Link>

        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="status-badge mb-4 inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              AI Analysis Complete
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Project Analysis
            </h1>

            <p className="mt-2 text-base text-muted-foreground capitalize">
              {result.project_summary.type || "Project"}
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Complexity
            </p>

            <p className="mt-1 font-mono text-sm text-muted-foreground">
              {result.complexity}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
