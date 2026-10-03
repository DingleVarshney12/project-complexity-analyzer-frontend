import { Goal, Layers3, ShoppingBag } from "lucide-react";

import type { ProjectResponse } from "@/lib/types";

interface ProjectSummaryProps {
  summary: ProjectResponse["project_summary"];
  complexitySignals: ProjectResponse["complexity_signals"];
}

function getScopeLabel(scope: number) {
  if (scope <= 3) return "Small";
  if (scope <= 7) return "Medium";
  return "Large";
}

export default function ProjectSummary({
  summary,
  complexitySignals,
}: ProjectSummaryProps) {
  const scopeLabel = getScopeLabel(complexitySignals.functional_scope);

  return (
    <section className="px-5 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-400">
            Project Overview
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Project Summary
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            A concise overview of what the AI understood from your project.
          </p>
        </div>

        <div className="glass-card-strong overflow-hidden">
          <div className="grid md:grid-cols-3">
            {/* Project Type */}
            <div className="border-b border-white/6 p-6 md:border-b-0 md:border-r">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-400/10">
                <ShoppingBag className="h-5 w-5 text-blue-400" />
              </div>

              <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Project Type
              </p>

              <p className="mt-2 text-lg font-semibold capitalize">
                {summary.type || "Not specified"}
              </p>
            </div>

            {/* Core Objective */}
            <div className="border-b border-white/6 p-6 md:border-b-0 md:border-r">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/10 bg-purple-400/10">
                <Goal className="h-5 w-5 text-purple-400" />
              </div>

              <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Core Objective
              </p>

              <p className="mt-2 text-lg font-semibold">
                {summary.core_objective || "Not specified"}
              </p>
            </div>

            {/* Estimated Scope */}
            <div className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-400/10">
                <Layers3 className="h-5 w-5 text-blue-400" />
              </div>

              <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Estimated Scope
              </p>

              <p className="mt-2 text-lg font-semibold">{scopeLabel}</p>
            </div>
          </div>

          {/* AI Summary */}
          <div className="border-t border-white/6 p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              AI Summary
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
              {summary.summary || "No project summary was provided."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
