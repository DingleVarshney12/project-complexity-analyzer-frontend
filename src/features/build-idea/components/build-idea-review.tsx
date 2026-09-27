"use client";

import { useState } from "react";
import { ArrowLeft, Check, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { BuildIdeaResponse } from "@/lib/types";

interface BuildIdeaReviewProps {
  data: BuildIdeaResponse;
  onBack: () => void;
  onConfirm: (data: BuildIdeaResponse) => void;
}

export default function BuildIdeaReview({
  data,
  onBack,
  onConfirm,
}: BuildIdeaReviewProps) {
  const [formData, setFormData] = useState<BuildIdeaResponse>(data);

  const updateField = (
    field: keyof BuildIdeaResponse,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <Card className="glass-card-strong border-0 p-5 sm:p-6">
      <div className="mb-6">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
          <Sparkles className="h-5 w-5 text-blue-400" />
        </div>

        <h2 className="text-xl font-semibold tracking-tight">
          Review Your Project
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          We structured your idea using AI. Review the details and make
          any changes before continuing.
        </p>
      </div>

      <div className="space-y-5">
        {/* Project Description */}
        <div className="space-y-2">
          <Label htmlFor="project-description">
            Project description
          </Label>

          <Textarea
            id="project-description"
            value={formData.projectDescription}
            onChange={(event) =>
              updateField(
                "projectDescription",
                event.target.value,
              )
            }
            className="glass-input min-h-28 resize-y border-0 focus-visible:ring-1 focus-visible:ring-blue-500/50"
          />
        </div>

        {/* Main Features */}
        <div className="space-y-2">
          <Label htmlFor="main-features">
            Main features
          </Label>

          <Textarea
            id="main-features"
            value={formData.mainFeatures}
            onChange={(event) =>
              updateField(
                "mainFeatures",
                event.target.value,
              )
            }
            className="glass-input min-h-28 resize-y border-0 focus-visible:ring-1 focus-visible:ring-blue-500/50"
          />
        </div>

        {/* Input / Output */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="project-input">
              Project input
            </Label>

            <Textarea
              id="project-input"
              value={formData.projectInput}
              onChange={(event) =>
                updateField(
                  "projectInput",
                  event.target.value,
                )
              }
              className="glass-input min-h-24 resize-y border-0 focus-visible:ring-1 focus-visible:ring-blue-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-output">
              Project output
            </Label>

            <Textarea
              id="project-output"
              value={formData.projectOutput}
              onChange={(event) =>
                updateField(
                  "projectOutput",
                  event.target.value,
                )
              }
              className="glass-input min-h-24 resize-y border-0 focus-visible:ring-1 focus-visible:ring-blue-500/50"
            />
          </div>
        </div>

        {/* Platform / Technologies */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="platform">
              Platform
            </Label>

            <Input
              id="platform"
              value={formData.platform}
              onChange={(event) =>
                updateField(
                  "platform",
                  event.target.value,
                )
              }
              className="glass-input border-0 focus-visible:ring-1 focus-visible:ring-blue-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">
              Technologies
            </Label>

            <Input
              id="technologies"
              value={formData.technologies}
              onChange={(event) =>
                updateField(
                  "technologies",
                  event.target.value,
                )
              }
              className="glass-input border-0 focus-visible:ring-1 focus-visible:ring-blue-500/50"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Button
          type="button"
          onClick={() => onConfirm(formData)}
          className="btn-primary gap-2"
        >
          <Check className="h-4 w-4" />
          Confirm & Analyze
        </Button>
      </div>
    </Card>
  );
}