import { Cpu } from "lucide-react";

import type { ProjectResponse } from "@/lib/types";

interface TechnologyStackProps {
  technologies: ProjectResponse["technologies"];
}

export default function TechnologyStack({
  technologies,
}: TechnologyStackProps) {
  return (
    <section className="px-5 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-purple-400">
            Technology
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Technology Stack
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Technologies identified from your project requirements.
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3">
            <Cpu className="h-5 w-5 text-blue-400" />

            <div>
              <h3 className="font-semibold">Technologies</h3>
              <p className="text-xs text-muted-foreground">
                Technologies identified for this project
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {technologies.length > 0 ? (
              technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-lg border border-blue-400/10 bg-blue-400/10 px-3 py-2 text-sm text-blue-300"
                >
                  {technology}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No technologies were identified.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}