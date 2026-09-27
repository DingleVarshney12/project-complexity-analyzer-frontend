import { CheckCircle2, Lightbulb } from "lucide-react";

import type { ProjectResponse } from "@/lib/types";

interface ProjectRequirementsProps {
  requirements: ProjectResponse["requirements"];
}

export default function ProjectRequirements({
  requirements,
}: ProjectRequirementsProps) {
  const explicitRequirements = requirements.filter(
    (item) => item.type === "explicit",
  );

  const inferredRequirements = requirements.filter(
    (item) => item.type === "inferred",
  );

  return (
    <section className="px-5 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-400">
            Requirements
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Project Requirements
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Requirements provided directly by you and additional requirements
            inferred by the AI.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Explicit */}
          <div className="glass-card-strong p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-400/10 bg-blue-400/10">
                <CheckCircle2 className="h-5 w-5 text-blue-400" />
              </div>

              <div>
                <h3 className="font-semibold">Explicit Requirements</h3>
                <p className="text-xs text-muted-foreground">
                  Directly identified from your input
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {explicitRequirements.length > 0 ? (
                explicitRequirements.map((item) => (
                  <div
                    key={item.requirement}
                    className="rounded-xl border border-white/6 bg-white/2 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-medium">{item.requirement}</h4>

                      <span className="shrink-0 rounded-full border border-blue-400/10 bg-blue-400/10 px-2 py-1 text-[10px] text-blue-400">
                        Explicit
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No explicit requirements were identified.
                </p>
              )}
            </div>
          </div>

          {/* Inferred */}
          <div className="glass-card-strong p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-400/10 bg-purple-400/10">
                <Lightbulb className="h-5 w-5 text-purple-400" />
              </div>

              <div>
                <h3 className="font-semibold">AI-Inferred Requirements</h3>
                <p className="text-xs text-muted-foreground">
                  Requirements inferred from project context
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {inferredRequirements.length > 0 ? (
                inferredRequirements.map((item) => (
                  <div
                    key={item.requirement}
                    className="rounded-xl border border-white/6 bg-white/2 p-4"
                  >
                    <h4 className="font-medium">{item.requirement}</h4>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No AI-inferred requirements were identified.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
