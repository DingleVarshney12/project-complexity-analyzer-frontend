import {
  Braces,
  Cloud,
  Database,
  KeyRound,
  Network,
  Server,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { ProjectResponse } from "@/lib/types";

interface SkillsRequiredProps {
  skills: ProjectResponse["skills_required"];
}

const skillIcons: Record<string, LucideIcon> = {
  "frontend development": Braces,
  "backend development": Server,
  "database design": Database,
  "database management": Database,
  "caching": Cloud,
  "rest api development": Network,
  "api integration": Network,
  "payment integration": Network,
  authentication: KeyRound,
  "system design": Users,
  "cloud deployment": Cloud,
};

const skillDescriptions: Record<string, string> = {
  "frontend development":
    "Build responsive interfaces and complex user workflows.",
  "backend development":
    "Implement business logic, APIs, and application services.",
  "database design":
    "Design efficient data models and persistent application storage.",
  "database management":
    "Design and manage persistent application data.",
  caching:
    "Implement caching strategies to improve performance and scalability.",
  "rest api development":
    "Design and implement APIs for communication between application services.",
  "api integration":
    "Connect the application with external services.",
  "payment integration":
    "Integrate secure payment processing and transaction workflows.",
  authentication:
    "Implement secure identity and authorization flows.",
  "system design":
    "Design scalable architecture across multiple application components.",
  "cloud deployment":
    "Deploy, monitor, and maintain production infrastructure.",
};

export default function SkillsRequired({
  skills,
}: SkillsRequiredProps) {
  return (
    <section className="px-5 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-purple-400">
            Developer Skills
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Skills Required
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Technical skills that may be needed to successfully build the
            project.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => {
            const key = skill.toLowerCase();
            const Icon = skillIcons[key] ?? Braces;
            const description =
              skillDescriptions[key] ||
              "Technical expertise that may be required to successfully build and maintain this part of the project.";

            return (
              <div
                key={skill}
                className="glass-card p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-400/10 bg-purple-400/10">
                  <Icon className="h-5 w-5 text-purple-400" />
                </div>

                <h3 className="mt-4 font-semibold">{skill}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}