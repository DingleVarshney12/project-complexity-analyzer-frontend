import type { ComplexityLevel } from "@/lib/types";

const levels: {
  label: ComplexityLevel;
  range: string;
  className: string;
}[] = [
  {
    label: "Easy",
    range: "0–39",
    className: "bg-emerald-400",
  },
  {
    label: "Medium",
    range: "40–69",
    className: "bg-amber-400",
  },
  {
    label: "Hard",
    range: "70–100",
    className: "bg-red-400",
  },
];

export default function ComplexityLegend() {
  return (
    <div className="mt-8 border-t border-white/6 pt-6">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Complexity Levels
      </p>

      <div className="flex flex-wrap gap-5">
        {levels.map((level) => (
          <div key={level.label} className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${level.className}`}
            />

            <span className="text-sm text-muted-foreground">
              {level.label}
            </span>

            <span className="text-xs text-muted-foreground/60">
              {level.range}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}