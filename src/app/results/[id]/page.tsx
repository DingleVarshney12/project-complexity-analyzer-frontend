"use client";

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

interface ResultsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ResultsPage({
  params,
}: ResultsPageProps) {
  const [result, setResult] = useState<ProjectResponse | null>(null);
  useEffect(() => {
    const storedResult = sessionStorage.getItem(
      `project-analysis-result`,
    );

    if (!storedResult) return;

    try {
      const parsedResult: ProjectResponse = JSON.parse(storedResult);
      setResult(parsedResult);
    } catch (error) {
      console.error("Failed to parse analysis result:", error);
    }
  }, []);

  if (!result) {
    return (
      <main className="min-h-screen">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-muted-foreground">
            You dont have any active project analysis
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <ResultHeader result={result} />

      <div className="relative">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-125 w-175 -translate-x-1/2 rounded-full bg-blue-500/4 blur-3xl" />

        <ComplexityOverview result={result} />

        <ComplexityDimensions dimensions={result.dimensions} />

        <ComplexityFactors factors={result.factors} />

        <ProjectSummary summary={result.project_summary} complexitySignals={result.complexity_signals} />

        <IdentifiedFeatures
          features={result.features}
          aiFeatures={result.ai_features}
        />

        <ProjectRequirements
          requirements={result.requirements}
        />

        <TechnologyStack
          technologies={result.technologies}
        />

        <Recommendations
          suggestions={result.suggestions}
        />

        <SkillsRequired
          skills={result.skills_required}
        />

        <FinalActionBar />
      </div>
    </main>
  );
}