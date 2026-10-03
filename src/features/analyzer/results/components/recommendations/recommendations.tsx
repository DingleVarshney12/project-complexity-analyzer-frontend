import { ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";

import type { ProjectResponse } from "@/lib/types";

interface RecommendationsProps {
  suggestions: ProjectResponse["suggestions"];
}

export default function Recommendations({ suggestions }: RecommendationsProps) {
  return (
    <section className="px-5 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-400">
            AI Guidance
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Recommendations
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Practical suggestions for managing the complexity of your project.
          </p>
        </div>

        <div className="space-y-4">
          {suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <div key={item.name} className="glass-card group p-6">
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-400/10">
                    <span className="text-sm font-bold text-blue-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-semibold">{item.name}</h3>

                      <ArrowRight className="hidden h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 sm:block" />
                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/5 bg-white/2 p-3">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />

                      <p className="text-xs leading-5 text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Why:
                        </span>{" "}
                        {item.reason}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-card p-6">
              <p className="text-sm text-muted-foreground">
                No recommendations were generated for this project.
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          Recommendations are generated based on the analyzed project scope.
        </div>
      </div>
    </section>
  );
}
