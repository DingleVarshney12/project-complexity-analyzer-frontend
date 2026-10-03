import { Card } from "@/components/ui/card";
import type { ProjectApiResponse } from "@/lib/api/projects";

type ComplexityDistributionProps = {
  projects: ProjectApiResponse[];
  isLoading: boolean;
};

const levels = [
  {
    name: "Easy",
    barClass: "bg-emerald-400",
    textClass: "text-emerald-300",
  },
  {
    name: "Medium",
    barClass: "bg-amber-400",
    textClass: "text-amber-300",
  },
  {
    name: "Hard",
    barClass: "bg-red-400",
    textClass: "text-red-300",
  },
] as const;

export default function ComplexityDistribution({
  projects,
  isLoading,
}: ComplexityDistributionProps) {
  const analyzedProjects = projects.filter(
    (project) => project.analysis !== null,
  );

  const counts = {
    Easy: analyzedProjects.filter(
      (project) => project.analysis?.complexity === "Easy",
    ).length,
    Medium: analyzedProjects.filter(
      (project) => project.analysis?.complexity === "Medium",
    ).length,
    Hard: analyzedProjects.filter(
      (project) => project.analysis?.complexity === "Hard",
    ).length,
  };

  return (
    <Card className="glass-card mb-6 border-0 p-5 sm:p-6 mt-8">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Complexity distribution</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Breakdown of your analyzed projects by complexity level.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-5 animate-pulse">
          <div className="h-10 rounded bg-blue-500/5" />
          <div className="h-10 rounded bg-blue-500/5" />
          <div className="h-10 rounded bg-blue-500/5" />
        </div>
      ) : analyzedProjects.length === 0 ? (
        <p className="rounded-lg border border-blue-300/10 bg-blue-500/5 p-4 text-sm text-muted-foreground">
          Your complexity breakdown will appear after you analyze a project.
        </p>
      ) : (
        <div className="space-y-5">
          {levels.map((level) => {
            const count = counts[level.name];
            const percentage = Math.round(
              (count / analyzedProjects.length) * 100,
            );

            return (
              <div key={level.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className={`font-medium ${level.textClass}`}>
                    {level.name}
                  </span>
                  <span className="text-muted-foreground">
                    {count} {count === 1 ? "project" : "projects"} ·{" "}
                    {percentage}%
                  </span>
                </div>

                <div
                  className="h-2.5 overflow-hidden rounded-full bg-blue-950/70"
                  role="progressbar"
                  aria-label={`${level.name} projects`}
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${level.barClass}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
