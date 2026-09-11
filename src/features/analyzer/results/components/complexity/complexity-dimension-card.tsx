import type { LucideIcon } from "lucide-react";

interface ComplexityDimensionCardProps {
  title: string;
  description: string;
  score: number;
  icon: LucideIcon;
}

export default function ComplexityDimensionCard({
  title,
  description,
  score,
  icon: Icon,
}: ComplexityDimensionCardProps) {
  return (
    <div className="glass-card group p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-400/10">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>

        <span className="text-2xl font-bold">{score}</span>
      </div>

      <h3 className="mt-5 font-semibold">{title}</h3>

      <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <div className="mt-5">
        <div className="h-2 overflow-hidden rounded-full bg-white/6">
          <div
            className="h-full rounded-full bg-linear-to-r from-blue-500 to-purple-500 transition-all"
            style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}