"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

import AnalysisLoading from "./analysis-loader";

export default function AnalyzerForm() {
  const [showAdditional, setShowAdditional] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const router = useRouter();

  const [form, setForm] = useState({
    description: "",
    features: "",
    input: "",
    output: "",
    platform: "",
    technologies: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!isFormValid) return;

    setIsAnalyzing(true);
    setActiveStep(1);

    try {
      // Step 1
      setActiveStep(1);

      await new Promise((resolve) => setTimeout(resolve, 700));

      // Step 2
      setActiveStep(2);

      await new Promise((resolve) => setTimeout(resolve, 700));

      // Step 3
      setActiveStep(3);

      // API request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            project_description: form.description,
            main_features: form.features,
            project_input: form.input,
            project_output: form.output,
            platform: form.platform,
            technologies: form.technologies,
          }),
        },
      );

      // API error
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.detail || "Failed to analyze the project.",
        );
      }

      // Backend result
      const result = await response.json();

      // Step 4
      setActiveStep(4);

      await new Promise((resolve) => setTimeout(resolve, 700));

      // Complete
      setActiveStep(5);

      sessionStorage.setItem(
        "project-analysis-result",
        JSON.stringify(result),
      );

      router.push(`/results/${result.uid}`);
    } catch (error) {
      console.error("Project analysis failed:", error);

      setIsAnalyzing(false);
      setActiveStep(1);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while analyzing your project.",
      );
    }
  };

  const isFormValid =
    form.description.trim().length > 0 &&
    form.features.trim().length > 0 &&
    form.input.trim().length > 0 &&
    form.output.trim().length > 0;

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

  /*
   * -----------------------------------------
   * ANALYZER FORM
   * -----------------------------------------
   */

  return (
    <section className="relative px-5 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Main Card */}
        <Card className="overflow-hidden glass-card-strong">

          {/* Header */}
          <CardHeader className="border-b border-blue-200/10 px-5 py-5 sm:px-7">
            <div className="flex items-start gap-3">

              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10">
                <Sparkles className="h-4 w-4 text-cyan-400" />
              </div>

              <div>
                <CardTitle className="text-base">
                  Tell us about your project
                </CardTitle>

                <CardDescription className="mt-1 text-sm">
                  Provide details about your project to get an AI-powered
                  complexity analysis.
                </CardDescription>
              </div>

            </div>
          </CardHeader>

          {/* Form */}
          <CardContent className="p-5 sm:p-7">
            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >

              {/* Description + Features */}
              <div className="grid gap-6 lg:grid-cols-2">

                {/* Description */}
                <div className="grid gap-3">
                  <Label htmlFor="project-description">
                    Project Description
                  </Label>

                  <Textarea
                    id="project-description"
                    value={form.description}
                    onChange={(e) =>
                      updateField("description", e.target.value)
                    }
                    placeholder="Describe your project in detail..."
                    maxLength={1000}
                    rows={6}
                    className="min-h-37.5 resize-none"
                  />

                  <div className="flex justify-end">
                    <span className="text-[11px] text-muted-foreground">
                      {form.description.length}/1000
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="grid gap-3">
                  <Label htmlFor="main-features">
                    Main Features
                  </Label>

                  <Textarea
                    id="main-features"
                    value={form.features}
                    onChange={(e) =>
                      updateField("features", e.target.value)
                    }
                    placeholder={`List the major features of your project...

Example:
User authentication
Product search
Shopping cart
Payment integration`}
                    maxLength={1000}
                    rows={6}
                    className="min-h-37.5 resize-none"
                  />

                  <div className="flex justify-end">
                    <span className="text-[11px] text-muted-foreground">
                      {form.features.length}/1000
                    </span>
                  </div>
                </div>

              </div>

              {/* Input + Output */}
              <div className="grid gap-6 lg:grid-cols-2">

                {/* Input */}
                <div className="grid gap-3">
                  <Label htmlFor="project-input">
                    Project Input
                  </Label>

                  <Textarea
                    id="project-input"
                    value={form.input}
                    onChange={(e) =>
                      updateField("input", e.target.value)
                    }
                    placeholder={`What data does your project receive?

Example:
User registration data
Product information
Payment details
Search queries`}
                    maxLength={1000}
                    rows={6}
                    className="min-h-37.5 resize-none"
                  />

                  <div className="flex justify-end">
                    <span className="text-[11px] text-muted-foreground">
                      {form.input.length}/1000
                    </span>
                  </div>
                </div>

                {/* Output */}
                <div className="grid gap-3">
                  <Label htmlFor="project-output">
                    Project Output
                  </Label>

                  <Textarea
                    id="project-output"
                    value={form.output}
                    onChange={(e) =>
                      updateField("output", e.target.value)
                    }
                    placeholder={`What does your project produce?

Example:
Product listings
Order confirmation
Payment status
Delivery tracking`}
                    maxLength={1000}
                    rows={6}
                    className="min-h-37.5 resize-none"
                  />

                  <div className="flex justify-end">
                    <span className="text-[11px] text-muted-foreground">
                      {form.output.length}/1000
                    </span>
                  </div>
                </div>

              </div>

              {/* Divider */}
              <Separator />

              {/* Additional Information */}
              <Collapsible
                open={showAdditional}
                onOpenChange={setShowAdditional}
              >
                <CollapsibleTrigger
                    type="button"
                    className="flex h-auto w-full justify-between rounded-lg px-2 py-2 text-left hover:bg-blue-400/5"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        Additional Information
                      </p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Optional — provide your platform and technology
                        preferences.
                      </p>
                    </div>

                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        showAdditional ? "rotate-180" : ""
                      }`}
                    />
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="mt-5 grid gap-5 rounded-xl border border-blue-300/10 bg-blue-950/10 p-4 sm:p-5 lg:grid-cols-2">

                    {/* Platform */}
                    <div className="grid gap-3">
                      <Label htmlFor="platform">
                        Platform
                      </Label>

                      <Select
                        value={form.platform}
                        onValueChange={(value) =>
                          updateField("platform", value ?? "")
                        }
                      >
                        <SelectTrigger
                          id="platform"
                          className="w-full"
                        >
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="web">
                            Web Application
                          </SelectItem>

                          <SelectItem value="mobile">
                            Mobile Application
                          </SelectItem>

                          <SelectItem value="desktop">
                            Desktop
                          </SelectItem>

                          <SelectItem value="api">
                            API
                          </SelectItem>

                          <SelectItem value="other">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Technologies */}
                    <div className="grid gap-3">
                      <Label htmlFor="technologies">
                        Technologies
                      </Label>

                      <Input
                        id="technologies"
                        type="text"
                        value={form.technologies}
                        onChange={(e) =>
                          updateField(
                            "technologies",
                            e.target.value,
                          )
                        }
                        placeholder="e.g. Next.js, Node.js, PostgreSQL, Redis"
                      />
                    </div>

                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Actions */}
              <div className="flex flex-col items-center gap-3 pt-1 sm:flex-row sm:justify-end">

                <p className="order-2 text-[11px] text-muted-foreground sm:order-1">
                  Analysis usually takes a few seconds.
                </p>

                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="order-1 min-w-42.5 sm:order-2 p-4"
                >
                  Analyze Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

              </div>

            </form>
          </CardContent>
        </Card>

        {/* Bottom hint */}
        <div className="mt-5 flex justify-center">
          <p className="text-center text-xs text-muted-foreground">
            Your project information is used only to generate the complexity
            analysis.
          </p>
        </div>

      </div>
    </section>
  );
}