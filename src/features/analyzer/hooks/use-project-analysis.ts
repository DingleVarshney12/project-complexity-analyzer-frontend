"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export function useProjectAnalysis() {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [analysisError, setAnalysisError] = useState("");

  async function analyzeProject(createProject: () => Promise<{ uid: string }>) {
    setAnalysisError("");
    setIsAnalyzing(true);
    setActiveStep(1);

    try {
      await wait(700);
      setActiveStep(2);

      await wait(700);
      setActiveStep(3);

      const project = await createProject();

      setActiveStep(4);
      await wait(700);

      setActiveStep(5);
      await wait(700);

      router.push(`/results/${project.uid}`);
    } catch (error) {
      console.error("Project analysis failed:", error);
      setIsAnalyzing(false);
      setActiveStep(1);
      setAnalysisError(
        error instanceof Error
          ? error.message
          : "Analysis failed. Please try again.",
      );
    }
  }

  return {
    isAnalyzing,
    activeStep,
    analysisError,
    analyzeProject,
  };
}
