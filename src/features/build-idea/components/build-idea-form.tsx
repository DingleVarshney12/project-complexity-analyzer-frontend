"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { createProject } from "@/lib/api/projects";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { generateBuildIdea } from "@/lib/api/build-idea";
import type { BuildIdeaResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import BuildIdeaReview from "./build-idea-review";
import AnalysisLoading from "../../analyzer/components/analysis-loader";

const MAX_LENGTH = 5000;

export default function BuildIdeaForm() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const router = useRouter();
  const [result, setResult] = useState<BuildIdeaResponse | null>(null);

  const handleSubmit = async () => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || isGenerating) return;

    setIsGenerating(true);
    setError("");

    try {
      const data = await generateBuildIdea(trimmedPrompt);

      setResult(data);
    } catch (error:unknown) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    setResult(null);
    setError("");
  };

  const handleConfirm = async (data: BuildIdeaResponse) => {
    setIsAnalyzing(true);
    setActiveStep(1);

    try {
      // Step 1
      setActiveStep(1);

      await new Promise((resolve) => setTimeout(resolve, 700));

      // Step 2
      setActiveStep(2);

      await new Promise((resolve) => setTimeout(resolve, 700));

      // Step 3 - Create / analyze project
      setActiveStep(3);

      const res = await createProject({
        projectDescription: data.projectDescription,
        mainFeatures: data.mainFeatures,
        projectInput: data.projectInput,
        projectOutput: data.projectOutput,
        platform: data.platform,
        technologies: data.technologies,
      });

      // Step 4
      setActiveStep(4);

      await new Promise((resolve) => setTimeout(resolve, 700));

      // Step 5
      setActiveStep(5);

      await new Promise((resolve) => setTimeout(resolve, 700));

      router.push(`/results/${res.uid}`);
    } catch (error) {
      console.error("Project creation failed:", error);

      setIsAnalyzing(false);
      setActiveStep(1);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while analyzing your project.",
      );
    }
  };

  /*
   * -----------------------------------------
   * ANALYSIS / LOADING STATE
   * -----------------------------------------
   */

  if (isAnalyzing) {
    return (
      <section className="relative px-5 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Card className="overflow-hidden border-blue-300/10 bg-background/60 backdrop-blur-xl">
            <AnalysisLoading activeStep={activeStep} />
          </Card>
        </div>
      </section>
    );
  }

  if (result) {
    return (
      <BuildIdeaReview
        data={result}
        onBack={handleBack}
        onConfirm={handleConfirm}
      />
    );
  }

  return (
    <Card className="glass-card-strong border-0 p-5 sm:p-6">
      <div className="mb-6">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
          <Sparkles className="h-5 w-5 text-blue-400" />
        </div>

        <h2 className="text-xl font-semibold tracking-tight">
          Describe Your Project
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Tell us what you want to build in your own words. You don&apos;t need to
          structure the information yourself.
        </p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="build-idea-prompt">Project idea</Label>

        <Textarea
          id="build-idea-prompt"
          value={prompt}
          onChange={(event) => {
            setPrompt(event.target.value);
            setError("");
          }}
          placeholder="Example: I want to build a smart agriculture system that monitors soil moisture, temperature and humidity, automatically irrigates plants, and shows the data on a web dashboard..."
          maxLength={MAX_LENGTH}
          disabled={isGenerating}
          className="glass-input min-h-44 resize-y border-0 focus-visible:ring-1 focus-visible:ring-blue-500/50"
        />

        <div className="flex justify-between">
          {error ? (
            <p className="text-xs text-destructive">{error}</p>
          ) : (
            <span />
          )}

          <span className="text-xs text-muted-foreground">
            {prompt.length}/{MAX_LENGTH}
          </span>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!prompt.trim() || isGenerating}
          className="btn-primary gap-2"
        >
          {isGenerating ? (
            <>
              <Sparkles className="h-4 w-4 animate-pulse" />
              Structuring...
            </>
          ) : (
            <>
              Build Project with AI
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
