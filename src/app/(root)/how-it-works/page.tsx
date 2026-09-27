import Link from "next/link";
import {
  BrainCircuit,
  FileText,
  Gauge,
  Lightbulb,
  Search,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Describe Your Project",
    description:
      "Tell the analyzer what you are building, its main features, expected inputs and outputs, and optionally provide your technology stack.",
    icon: FileText,
    color: "blue",
  },
  {
    number: "02",
    title: "AI Understands the Scope",
    description:
      "The analyzer processes your project description and identifies important functionality, technical requirements, integrations, and architecture concerns.",
    icon: BrainCircuit,
    color: "purple",
  },
  {
    number: "03",
    title: "Complexity Is Evaluated",
    description:
      "Multiple dimensions are considered to estimate how technically demanding the project will be.",
    icon: Gauge,
    color: "red",
  },
  {
    number: "04",
    title: "Get Actionable Insights",
    description:
      "The final dashboard explains the complexity, identifies requirements, suggests technologies, and recommends skills and implementation strategies.",
    icon: Lightbulb,
    color: "cyan",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      <section className="px-5 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            {/* Existing CSS kept */}
            <Badge className="status-badge mx-auto mb-5 inline-flex h-auto items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Simple AI Workflow
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl ">
              How It <span className="gradient-text">Works</span>
            </h1>

            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              Turn a project idea into a clear technical complexity assessment
              in just a few steps.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <Card
                  key={step.number}
                  className="glass-card overflow-hidden p-0"
                >
                  <CardContent className="p-7">
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border border-${step.color}-400/10 bg-${step.color}-400/10`}
                      >
                        <Icon className={`h-5 w-5 text-${step.color}-400`} />
                      </div>

                      <span className="font-mono text-sm text-muted-foreground/50">
                        {step.number}
                      </span>
                    </div>

                    <h2 className="mt-6 text-xl font-semibold">{step.title}</h2>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Existing glass-card-strong kept */}
          <Card className="glass-card-strong mt-8 p-0 text-center">
            <CardContent className="p-8">
              <Search className="mx-auto h-6 w-6 text-purple-400" />

              <h2 className="mt-4 text-2xl font-semibold">
                Ready to analyze your idea?
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Get a structured understanding of your project before you start
                building.
              </p>

              {/* Existing btn-primary kept */}
              <Link href="/">
                <Button className="btn-primary mt-6 inline-flex items-center gap-2 p-6">
                  Start Analysis
                  <Sparkles className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
