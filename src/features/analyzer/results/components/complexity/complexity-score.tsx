import { BrainCircuit, ShieldCheck } from "lucide-react";

import type { ComplexityLevel } from "@/lib/types";

interface ComplexityScoreProps {
  score: number;
  confidence: number;
  complexity: ComplexityLevel;
}

const complexityStyles: Record<
  ComplexityLevel,
  {
    label: string;
    className: string;
    color: string;
  }
> = {
  Easy: {
    label: "EASY",
    className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
    color: "#34d399",
  },
  Medium: {
    label: "MEDIUM",
    className: "border-amber-400/20 bg-amber-400/10 text-amber-400",
    color: "#fbbf24",
  },
  Hard: {
    label: "HARD",
    className: "border-red-400/20 bg-red-400/10 text-red-400",
    color: "#f87171",
  },
};

export default function ComplexityScore({
  score,
  confidence,
  complexity,
}: ComplexityScoreProps) {
  const radius = 92;
  const circumference = 2 * Math.PI * radius;

  const normalizedScore = Math.min(Math.max(score, 0), 100);

  const progress = circumference - (normalizedScore / 100) * circumference;

  const complexityStyle = complexityStyles[complexity];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-64 w-64">
        <svg
          className="h-full w-full -rotate-90"
          viewBox="0 0 220 220"
          aria-label={`Complexity score ${score} out of 100`}
        >
          {/* Background Circle */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-white/6"
          />

          {/* Progress Circle */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke={complexityStyle.color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            className="transition-all duration-700 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${complexityStyle.color}55)`,
            }}
          />
        </svg>

        {/* Score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-6xl font-bold tracking-tight"
            style={{ color: complexityStyle.color }}
          >
            {score}
          </span>

          <span className="text-sm text-muted-foreground">/ 100</span>
        </div>
      </div>

      {/* Complexity Badge */}
      <div
        className={`mt-2 rounded-full border px-5 py-1.5 ${complexityStyle.className}`}
      >
        <span className="text-sm font-semibold tracking-widest">
          {complexityStyle.label}
        </span>
      </div>

      {/* AI Confidence */}
      <div className="mt-6 flex items-center gap-2 rounded-lg border border-white/6 bg-white/2 px-4 py-2.5">
        <ShieldCheck className="h-4 w-4 text-blue-400" />

        <span className="text-sm text-muted-foreground">AI Confidence</span>

        <span className="text-sm font-semibold text-white">{confidence}%</span>
      </div>

      {/* AI Assessment */}
      <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <BrainCircuit className="h-4 w-4 text-blue-400" />
        AI-generated complexity assessment
      </div>
    </div>
  );
}
