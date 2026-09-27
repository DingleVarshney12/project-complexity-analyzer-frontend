"use client";

import { useParams, useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

import { getProjectByUid ,mapProjectApiResponseToProjectResponse} from "@/lib/api/projects";

import { useEffect, useState } from "react";

import ResultHeader from "@/features/analyzer/results/result-header";
import ComplexityOverview from "@/features/analyzer/results/components/complexity/complexity-overview";
import ComplexityDimensions from "@/features/analyzer/results/components/complexity/complexity-dimensions";
import ComplexityFactors from "@/features/analyzer/results/components/complexity/complexity-factors";
import ProjectSummary from "@/features/analyzer/results/components/project/project-summary";
import IdentifiedFeatures from "@/features/analyzer/results/components/project/identified-features";
import ProjectRequirements from "@/features/analyzer/results/components/project/project-requirements";
import TechnologyStack from "@/features/analyzer/results/components/project/technology-stack";
import Recommendations from "@/features/analyzer/results/components/recommendations/recommendations";
import SkillsRequired from "@/features/analyzer/results/components/recommendations/skills-required";
import FinalActionBar from "@/features/analyzer/results/final-action-bar";

import type { ProjectResponse } from "@/lib/types";

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();

  const uid = params.id as string;

  const [project, setProject] =
  useState<ProjectResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  if (!uid) return;

  let isMounted = true;

  async function loadProject() {
    setIsLoading(true);
    setError("");

    try {
      const apiProject = await getProjectByUid(uid);

      const mappedProject =
        mapProjectApiResponseToProjectResponse(apiProject);

      if (isMounted) {
        setProject(mappedProject);
      }
    } catch (error) {
      console.error("Failed to load project:", error);

      if (isMounted) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load project.",
        );
      }
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  }

  loadProject();

  return () => {
    isMounted = false;
  };
}, [uid]);
  if (isLoading) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <RefreshCw className="h-4 w-4 animate-spin" />
          Loading project analysis...
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-5 text-center">
        <h1 className="text-xl font-semibold">
          Unable to load project
        </h1>

        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {error || "This project does not exist."}
        </p>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="btn-primary mt-6 rounded-lg px-5 py-2.5 text-sm"
        >
          Back to Dashboard
        </button>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 text-center">
        <div>
          <h1 className="text-xl font-semibold">
            Analysis unavailable
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            This project does not have a completed analysis yet.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <ResultHeader result={project} />

      <div className="relative">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-125 w-175 -translate-x-1/2 rounded-full bg-blue-500/4 blur-3xl" />

        <ComplexityOverview result={project} />

        <ComplexityDimensions dimensions={project.dimensions} />

        <ComplexityFactors factors={project.factors} />

        <ProjectSummary
          summary={project.project_summary}
          complexitySignals={project.complexity_signals}
        />

        <IdentifiedFeatures
          features={project.features}
          aiFeatures={project.ai_features}
        />

        <ProjectRequirements requirements={project.requirements} />

        <TechnologyStack technologies={project.technologies} />

        <Recommendations suggestions={project.suggestions} />

        <SkillsRequired skills={project.skills_required} />

        <FinalActionBar />
      </div>
    </main>
  );
}
