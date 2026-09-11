import {
  Boxes,
  Database,
  Layers,
  ServerCog,
  ShieldAlert,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { ProjectResponse } from "@/lib/types";

interface ComplexityFactorsProps {
  factors: ProjectResponse["factors"];
}

const factorIcons: Record<
  ProjectResponse["factors"][number]["type"],
  LucideIcon
> = {
  technical: ServerCog,
  integration: Boxes,
  scope: Layers,
  data: Database,
  security: ShieldAlert,
  external_services: Workflow,
};

const factorDescriptions: Record<
  ProjectResponse["factors"][number]["type"],
  string
> = {
  technical:
    "The project requires multiple technical components and non-trivial application logic.",
  integration:
    "External APIs and systems need to communicate reliably with the application.",
  scope:
    "The project contains multiple features and workflows that increase the overall implementation scope.",
  data:
    "The project involves meaningful data relationships, storage, and processing requirements.",
  security:
    "The project requires security controls around authentication, authorization, and data protection.",
  external_services:
    "External services introduce additional integration, reliability, and operational considerations.",
};

export default function ComplexityFactors({
  factors,
}: ComplexityFactorsProps) {
  return (
    <section className="px-5 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-card-strong p-6 sm:p-8">
          <div className="mb-7">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-400">
              Why It&apos;s Complex
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Complexity Factors
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              The main factors contributing to the project&apos;s complexity.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {factors.map((factor) => {
              const Icon = factorIcons[factor.type];

              return (
                <div
                  key={factor.type}
                  className="rounded-xl border border-white/6 bg-white/2 p-5 transition-colors hover:bg-white/4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-400/10 bg-purple-400/10">
                    <Icon className="h-5 w-5 text-purple-400" />
                  </div>

                  <h3 className="mt-4 font-semibold">
                    {factor.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {factorDescriptions[factor.type]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}