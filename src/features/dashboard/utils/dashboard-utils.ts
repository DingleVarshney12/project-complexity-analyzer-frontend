import type { ProjectApiResponse } from "@/lib/api/projects";

export function getComplexityClass(complexity: string | undefined): string {
  switch (complexity) {
    case "Easy":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-400";

    case "Medium":
      return "border-amber-400/20 bg-amber-400/10 text-amber-400";

    case "Hard":
      return "border-red-400/20 bg-red-400/10 text-red-400";

    default:
      return "border-muted bg-muted text-muted-foreground";
  }
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getProjectTitle(project: ProjectApiResponse): string {
  return (
    project.name?.trim() ||
    project.analysis?.projectSummary?.type ||
    "Untitled Project"
  );
}

export function calculateDashboardStats(projects: ProjectApiResponse[]) {
  const analyzedProjects = projects.filter(
    (project) => project.analysis !== null,
  );

  const scores = analyzedProjects
    .map((project) => project.analysis?.score)
    .filter((score): score is number => typeof score === "number");

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((total, score) => total + score, 0) / scores.length,
        )
      : null;

  return {
    total: projects.length,
    analyzed: analyzedProjects.length,
    averageScore,
  };
}
