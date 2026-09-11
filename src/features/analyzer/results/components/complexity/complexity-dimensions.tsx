import {
  Database,
  Layers3,
  Network,
  ServerCog,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import type { ProjectResponse } from "@/lib/types";
import ComplexityDimensionCard from "./complexity-dimension-card";

interface ComplexityDimensionsProps {
  dimensions: ProjectResponse["dimensions"];
}

export default function ComplexityDimensions({
  dimensions,
}: ComplexityDimensionsProps) {
  const dimensionData = [
    {
      title: "Technical Complexity",
      description:
        "The project requires multiple technical components and non-trivial application logic.",
      value: dimensions.technical_complexity,
      max: 25,
      icon: ServerCog,
    },
    {
      title: "Integration Complexity",
      description:
        "External APIs and services need to communicate reliably with the application.",
      value: dimensions.integration_complexity,
      max: 20,
      icon: Network,
    },
    {
      title: "Scope Complexity",
      description:
        "The number of features and workflows creates the overall implementation scope.",
      value: dimensions.scope_complexity,
      max: 25,
      icon: Layers3,
    },
    {
      title: "Data Complexity",
      description:
        "The project involves data relationships, storage, and processing requirements.",
      value: dimensions.data_complexity,
      max: 15,
      icon: Database,
    },
    {
      title: "Security Complexity",
      description:
        "The project requires security controls around authentication, authorization, and data.",
      value: dimensions.security_complexity,
      max: 10,
      icon: ShieldCheck,
    },
    {
      title: "External Services",
      description:
        "External services add integration and operational considerations to the project.",
      value: dimensions.external_services_complexity,
      max: 5,
      icon: Workflow,
    },
  ];

  const dimensionsWithScores = dimensionData.map((dimension) => ({
    title: dimension.title,
    description: dimension.description,
    score: Math.round((dimension.value / dimension.max) * 100),
    icon: dimension.icon,
  }));

  return (
    <section className="px-5 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-400">
            Breakdown
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Complexity Dimensions
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            See which areas contribute most to the overall complexity score.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {dimensionsWithScores.map((dimension) => (
            <ComplexityDimensionCard
              key={dimension.title}
              {...dimension}
            />
          ))}
        </div>
      </div>
    </section>
  );
}