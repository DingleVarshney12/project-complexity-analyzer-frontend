"use client";

import { BrainCircuit, Check, Circle, Loader2, Sparkles } from "lucide-react";

type AnalysisStep = {
  id: number;
  label: string;
};

const steps: AnalysisStep[] = [
  {
    id: 1,
    label: "Understanding project scope",
  },
  {
    id: 2,
    label: "Detecting technical features",
  },
  {
    id: 3,
    label: "Evaluating complexity",
  },
  {
    id: 4,
    label: "Generating recommendations",
  },
];

interface AnalysisLoadingProps {
  activeStep: number;
}

export default function AnalysisLoading({ activeStep }: AnalysisLoadingProps) {
  return (
    <div className="relative min-h-155 overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.07] blur-[120px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-62.5 w-62.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/6 blur-[100px]" />

      {/* Content */}
      <div className="relative flex min-h-155 flex-col items-center justify-center px-5">
        {/* AI Orb */}
        <div className="relative mb-9 flex h-28 w-28 items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full border border-blue-400/20 border-t-blue-400/70" />

          {/* Second ring */}
          <div className="absolute inset-3 animate-[spin_5s_linear_infinite_reverse] rounded-full border border-purple-400/15 border-b-purple-400/60" />

          {/* Glow */}
          <div className="absolute inset-6 rounded-full bg-blue-500/10 blur-xl" />

          {/* Core */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/25 bg-[#0c1730]/90 shadow-[0_0_35px_rgba(59,130,246,0.18)] backdrop-blur-xl">
            <BrainCircuit className="h-7 w-7 text-blue-400" />
          </div>

          {/* Orbit dots */}
          <div className="absolute -right-1 top-5 h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />

          <div className="absolute -bottom-1 left-7 h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
        </div>

        {/* Heading */}
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400/80">
              AI Analysis
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
            Analyzing your project...
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            Our AI is examining your project structure, technical requirements,
            and potential complexity.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-9 w-full max-w-md">
          <div className="glass-card overflow-hidden p-4 sm:p-5">
            <div className="space-y-1">
              {steps.map((step) => {
                /*
                 * activeStep is 1-based:
                 *
                 * 1 = first step active
                 * 2 = second step active
                 * 3 = third step active
                 * 4 = fourth step active
                 * 5 = all steps completed
                 */

                const isCompleted = step.id < activeStep;

                const isActive = step.id === activeStep;

                const isPending = step.id > activeStep;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-500 ${
                      isActive ? "bg-blue-500/[0.07]" : ""
                    }`}
                  >
                    {/* Status */}
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                      {/* Completed */}
                      {isCompleted && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-400/20 bg-blue-400/10 transition-all duration-500">
                          <Check className="h-3.5 w-3.5 text-blue-400" />
                        </div>
                      )}

                      {/* Active */}
                      {isActive && (
                        <div className="relative flex h-6 w-6 items-center justify-center">
                          <div className="absolute inset-0 animate-ping rounded-full bg-blue-400/10" />

                          <div className="relative flex h-6 w-6 items-center justify-center rounded-full border border-blue-400/30 bg-blue-400/10">
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
                          </div>
                        </div>
                      )}

                      {/* Pending */}
                      {isPending && (
                        <Circle className="h-4 w-4 text-slate-700 transition-colors duration-500" />
                      )}
                    </div>

                    {/* Label */}
                    <span
                      className={`text-sm transition-all duration-500 ${
                        isCompleted
                          ? "text-slate-300"
                          : isActive
                            ? "font-medium text-slate-100"
                            : "text-slate-600"
                      }`}
                    >
                      {step.label}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <span className="ml-auto text-[10px] font-medium uppercase tracking-wider text-blue-400/70">
                        Processing
                      </span>
                    )}

                    {/* Completed indicator */}
                    {isCompleted && (
                      <span className="ml-auto text-[10px] font-medium uppercase tracking-wider text-slate-600">
                        Done
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <p className="mt-5 text-center text-[11px] text-slate-600">
          This usually takes a few seconds.
        </p>
      </div>
    </div>
  );
}
