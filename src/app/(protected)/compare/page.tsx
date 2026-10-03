"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Card } from "@/components/ui/card";
import { getProjects, type ProjectApiResponse } from "@/lib/api/projects";

type ComparableProject = ProjectApiResponse & {
  analysis: NonNullable<ProjectApiResponse["analysis"]>;
};

const dimensionRows = [
  ["Technical complexity", "technical_complexity"],
  ["Integration complexity", "integration_complexity"],
  ["Scope complexity", "scope_complexity"],
  ["Data complexity", "data_complexity"],
  ["Security complexity", "security_complexity"],
  ["External services", "external_services_complexity"],
] as const;

function ProjectComparison() {
  const searchParams = useSearchParams();
  const firstId = searchParams.get("first");
  const secondId = searchParams.get("second");

  const [projects, setProjects] = useState<
    [ComparableProject, ComparableProject] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadComparison() {
      if (!firstId || !secondId || firstId === secondId) {
        setError("Choose two different projects to compare.");
        setIsLoading(false);
        return;
      }

      try {
        const allProjects = await getProjects();
        const first = allProjects.find((project) => project.uid === firstId);
        const second = allProjects.find((project) => project.uid === secondId);

        if (!first?.analysis || !second?.analysis) {
          throw new Error(
            "One or both projects could not be found or have no analysis.",
          );
        }

        if (!cancelled) {
          setProjects([
            first as ComparableProject,
            second as ComparableProject,
          ]);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load these projects.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadComparison();

    return () => {
      cancelled = true;
    };
  }, [firstId, secondId]);

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-5">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <RefreshCw className="h-4 w-4 animate-spin" />
          Loading comparison...
        </div>
      </main>
    );
  }

  if (error || !projects) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-3xl px-5 py-12">
        <Card className="glass-card p-8 text-center">
          <h1 className="text-xl font-semibold">Unable to compare projects</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {error || "Select two analyzed projects and try again."}
          </p>
          <Link
            href="/projects"
            className="btn-primary mt-5 inline-flex rounded-lg px-4 py-2 text-sm"
          >
            Back to My Projects
          </Link>
        </Card>
      </main>
    );
  }

  const [first, second] = projects;

  const projectTitle = (project: ComparableProject) =>
    project.name || project.analysis.projectSummary.type || "Untitled project";

  return (
    <main className="min-h-[calc(100vh-4rem)] px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Projects
        </Link>

        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-400">
            Project comparison
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Compare analyses
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[first, second].map((project) => (
            <Card key={project.uid} className="glass-card p-5 sm:p-6">
              <p className="text-sm text-muted-foreground">
                {project.analysis.complexity} complexity
              </p>
              <h2 className="mt-1 text-xl font-semibold">
                {projectTitle(project)}
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Score{" "}
                <span className="font-semibold text-foreground">
                  {project.analysis.score}/100
                </span>
                <span className="mx-2">·</span>
                Confidence{" "}
                <span className="font-semibold text-foreground">
                  {Math.round(project.analysis.confidence * 100)}%
                </span>
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[first, second].map((project) => {
            const technologies =
              project.analysis.technologies.length > 0
                ? project.analysis.technologies
                : project.technologies
                    .split(",")
                    .map((technology) => technology.trim())
                    .filter(Boolean);

            return (
              <Card
                key={`${project.uid}-overview`}
                className="glass-card p-5 sm:p-6"
              >
                <h2 className="text-lg font-semibold">
                  {projectTitle(project)}
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {project.analysis.projectSummary.summary ||
                    project.projectDescription}
                </p>

                <p className="mt-3 text-sm">
                  <span className="font-medium">Core objective: </span>
                  <span className="text-muted-foreground">
                    {project.analysis.projectSummary.core_objective ||
                      "No objective available."}
                  </span>
                </p>

                <h3 className="mt-5 text-sm font-medium">Technology stack</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {technologies.length > 0 ? (
                    technologies.map((technology) => (
                      <span
                        key={`${project.uid}-${technology}`}
                        className="rounded-full border border-blue-300/10 bg-blue-500/5 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {technology}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No technologies listed.
                    </p>
                  )}
                </div>

                <h3 className="mt-5 text-sm font-medium">Main features</h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {project.analysis.features.length > 0 ? (
                    project.analysis.features
                      .slice(0, 5)
                      .map((feature, index) => (
                        <li key={`${project.uid}-feature-${index}`}>
                          {feature}
                        </li>
                      ))
                  ) : (
                    <li>No features listed.</li>
                  )}
                </ul>
              </Card>
            );
          })}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[first, second].map((project) => {
            const topDrivers = [...project.analysis.factors]
              .sort((a, b) => b.contribution - a.contribution)
              .slice(0, 3);

            return (
              <Card
                key={`${project.uid}-drivers`}
                className="glass-card p-5 sm:p-6"
              >
                <h2 className="text-lg font-semibold">
                  Top complexity drivers
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {projectTitle(project)}
                </p>

                {topDrivers.length > 0 ? (
                  <ul className="mt-4 space-y-3">
                    {topDrivers.map((factor) => (
                      <li
                        key={factor.name}
                        className="flex items-center justify-between gap-4 border-t border-blue-300/10 pt-3"
                      >
                        <span className="text-sm">{factor.name}</span>
                        <span className="shrink-0 text-sm text-blue-300">
                          +{factor.contribution.toFixed(1)} pts
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    No complexity drivers available.
                  </p>
                )}
              </Card>
            );
          })}
        </div>
        <Card className="glass-card mt-5 overflow-hidden p-5 sm:p-6">
          <h2 className="mb-5 text-lg font-semibold">Complexity dimensions</h2>

          <div className="grid grid-cols-[minmax(0,1fr)_90px_90px] gap-x-4 gap-y-4 text-sm sm:grid-cols-[minmax(0,1fr)_130px_130px]">
            <p className="text-muted-foreground">Dimension</p>
            <p className="text-right font-medium">{projectTitle(first)}</p>
            <p className="text-right font-medium">{projectTitle(second)}</p>

            {dimensionRows.map(([label, key]) => (
              <div key={key} className="contents">
                <p className="border-t border-blue-300/10 pt-3 text-muted-foreground">
                  {label}
                </p>
                <p className="border-t border-blue-300/10 pt-3 text-right">
                  {first.analysis.dimensions[key]}
                </p>
                <p className="border-t border-blue-300/10 pt-3 text-right">
                  {second.analysis.dimensions[key]}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[first, second].map((project) => (
            <Card key={`${project.uid}-details`} className="glass-card p-5">
              <h2 className="text-lg font-semibold">{projectTitle(project)}</h2>

              <h3 className="mt-5 text-sm font-medium">Skills required</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {project.analysis.skillsRequired.length > 0 ? (
                  project.analysis.skillsRequired.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))
                ) : (
                  <li>No skills listed</li>
                )}
              </ul>

              <h3 className="mt-5 text-sm font-medium">Recommendations</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {project.analysis.suggestions.length > 0 ? (
                  project.analysis.suggestions.map((suggestion) => (
                    <li key={suggestion.name}>{suggestion.name}</li>
                  ))
                ) : (
                  <li>No recommendations listed</li>
                )}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function CompareProjectsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading comparison...</p>
        </main>
      }
    >
      <ProjectComparison />
    </Suspense>
  );
}
