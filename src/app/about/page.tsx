import Link from "next/link";
import {
  BrainCircuit,
  Gauge,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="px-5 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Badge
              className=" mx-auto mb-5 inline-flex h-auto items-center gap-2"
            >
              <Sparkles className="h-3.5 w-3.5" />
              About the Project
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Project{" "}
              <span className="gradient-text">Complexity Analyzer</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              An AI-powered developer tool designed to help you understand the
              technical complexity of a project before you start building it.
            </p>
          </div>

          <Card className="mt-14 glass-card p-8 sm:p-10">
            <CardContent className="mx-auto max-w-3xl p-0">
              <h2 className="text-2xl font-semibold">
                Why this tool exists
              </h2>

              <p className="mt-4 leading-8 text-muted-foreground">
                Developers often have a project idea without a clear
                understanding of how difficult it will be to implement.
                Complexity can come from the number of features, integrations,
                technologies, users, data flows, and architectural decisions
                involved.
              </p>

              <p className="mt-4 leading-8 text-muted-foreground">
                Project Complexity Analyzer turns that initial idea into a
                structured technical assessment so developers can identify
                challenges earlier and make better planning decisions.
              </p>
            </CardContent>
          </Card>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <Card className="glass-card p-6">
              <CardContent className="p-0">
                <BrainCircuit className="h-6 w-6 text-blue-400" />

                <h3 className="mt-5 font-semibold">
                  AI-Powered
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Uses AI to interpret project descriptions and identify
                  technical concerns.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card p-6">
              <CardContent className="p-0">
                <Gauge className="h-6 w-6 text-purple-400" />

                <h3 className="mt-5 font-semibold">
                  Structured Analysis
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Breaks complexity into understandable dimensions instead of
                  giving you a single unexplained number.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card p-6">
              <CardContent className="p-0">
                <Lightbulb className="h-6 w-6 text-blue-400" />

                <h3 className="mt-5 font-semibold">
                  Actionable Insights
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Provides requirements, technologies, skills, and practical
                  recommendations.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
            >
               <Button
                className="mt-6 inline-flex items-center gap-2 p-6"
              >
              Analyze a Project
              <Sparkles className="h-4 w-4" />
              </Button>
            </Link>

            {/* <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary ml-3 inline-flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a> */}
          </div>
        </div>
      </section>
    </main>
  );
}