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
  }
> = {
  Easy: {
    label: "EASY",
    className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
  },
  Medium: {
    label: "MEDIUM",
    className: "border-amber-400/20 bg-amber-400/10 text-amber-400",
  },
  Hard: {
    label: "HARD",
    className: "border-red-400/20 bg-red-400/10 text-red-400",
  },
};

export default function ComplexityScore({
  score,
  confidence,
  complexity,
}: ComplexityScoreProps) {
  const circumference = 2 * Math.PI * 92;
  const progress =
    circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference;

  const complexityStyle = complexityStyles[complexity];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-64 w-64">
        <svg
          className="h-full w-full -rotate-90"
          viewBox="0 0 220 220"
          aria-label={`Complexity score ${score} out of 100`}
        >
          <circle
            cx="110"
            cy="110"
            r="92"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-white/6"
          />

          <circle
            cx="110"
            cy="110"
            r="92"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
          />

          <defs>
            <linearGradient
              id="scoreGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" className="[stop-color:#3b82f6]" />
              <stop offset="100%" className="[stop-color:#8b5cf6]" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-bold tracking-tight text-white">
            {score}
          </span>

          <span className="text-sm text-muted-foreground">/ 100</span>
        </div>
      </div>

      <div
        className={`mt-2 rounded-full border px-5 py-1.5 ${complexityStyle.className}`}
      >
        <span className="text-sm font-semibold tracking-widest">
          {complexityStyle.label}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-lg border border-white/6 bg-white/2 px-4 py-2.5">
        <ShieldCheck className="h-4 w-4 text-blue-400" />

        <span className="text-sm text-muted-foreground">
          AI Confidence
        </span>

        <span className="text-sm font-semibold text-white">
          {confidence}%
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <BrainCircuit className="h-4 w-4 text-blue-400" />
        AI-generated complexity assessment
      </div>
    </div>
  );
}