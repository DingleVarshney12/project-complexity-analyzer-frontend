import ComplexityLegend from "./complexity-legend";
import ComplexityScore from "./complexity-score";
import type { ProjectResponse } from "@/lib/types";

interface ComplexityOverviewProps {
  result: ProjectResponse;
}

export default function ComplexityOverview({
  result,
}: ComplexityOverviewProps) {
  const { complexity, score, confidence, factors } = result;

  const primaryChallenge =
    factors
      .filter((factor) => factor.contribution > 0)
      .sort((a, b) => b.contribution - a.contribution)[0];

  const developmentEffort =
    complexity === "Easy"
      ? "Basic"
      : complexity === "Medium"
        ? "Moderate"
        : "Advanced";

  const challengeDescription = primaryChallenge
    ? `This area contributes ${primaryChallenge.contribution} points to the overall complexity.`
    : "This is one of the main contributors to the overall project complexity.";

  const complexityDescription =
    complexity === "Easy"
      ? "Based on the project scope, features, integrations, and technologies provided, the AI estimates that this project has a relatively manageable level of technical complexity."
      : complexity === "Medium"
        ? "Based on the project scope, features, integrations, and technologies provided, the AI estimates that this project requires a moderate level of technical planning and implementation effort."
        : "Based on the project scope, features, integrations, and technologies provided, the AI estimates that this project requires a high level of technical planning and implementation effort.";

  return (
    <section className="px-5 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-card-strong overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_1.15fr]">
            {/* Score */}
            <div className="relative flex items-center justify-center border-b border-white/6 p-8 lg:border-b-0 lg:border-r lg:p-12">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">
                <ComplexityScore
                  score={score}
                  confidence={Math.round(confidence * 100)}
                  complexity={complexity}
                />
              </div>
            </div>

            {/* Explanation */}
            <div className="p-8 lg:p-12">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-400">
                Overall Complexity
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Your project has a {complexity.toLowerCase()} level of
                complexity.
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                {complexityDescription}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/6 bg-white/2.5 p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Primary Challenge
                  </p>

                  <p className="mt-2 font-medium">
                    {primaryChallenge?.name ?? "Overall architecture"}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {challengeDescription}
                  </p>
                </div>

                <div className="rounded-xl border border-white/6 bg-white/2.5 p-5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Development Effort
                  </p>

                  <p className="mt-2 font-medium">
                    {developmentEffort}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {complexity === "Easy"
                      ? "Requires a relatively straightforward implementation approach."
                      : complexity === "Medium"
                        ? "Requires multiple development considerations and careful implementation."
                        : "Requires multiple development disciplines and careful architecture."}
                  </p>
                </div>
              </div>

              <ComplexityLegend />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
