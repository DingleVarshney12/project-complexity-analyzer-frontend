import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  FolderKanban,
  Plus,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { ProjectApiResponse } from "@/lib/api/projects";

import ProjectCard from "./project-card";

type ProjectsSectionProps = {
  projects: ProjectApiResponse[];
  isLoading: boolean;
  error: string;
  onRetry: () => void;
  onRename: (project: ProjectApiResponse) => void;
  onDelete: (project: ProjectApiResponse) => void;
  onToggleCompare: (uid: string) => void;
  selectedProjectIds: string[];
};

export default function ProjectsSection({
  projects,
  isLoading,
  error,
  onRetry,
  onRename,
  onDelete,
  onToggleCompare,
  selectedProjectIds,
}: ProjectsSectionProps) {
  const recentProjects = projects.slice(0, 5);

  return (
    <section className="mt-10">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Recent Projects</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your latest project analyses.
          </p>
        </div>

        {!isLoading && !error && projects.length > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              {projects.length} {projects.length === 1 ? "project" : "projects"}{" "}
              total
            </span>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-400 transition hover:text-blue-300"
            >
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {isLoading && (
        <Card className="glass-card flex min-h-64 items-center justify-center p-8">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Loading your projects...
          </div>
        </Card>
      )}

      {!isLoading && error && (
        <Card className="glass-card flex min-h-64 flex-col items-center justify-center p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>

          <h3 className="mt-4 text-base font-medium">Couldn’t load projects</h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {error}
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={onRetry}
            className="mt-5 gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        </Card>
      )}

      {!isLoading && !error && projects.length === 0 && (
        <Card className="glass-card flex min-h-64 flex-col items-center justify-center p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
            <FolderKanban className="h-5 w-5 text-blue-400" />
          </div>

          <h3 className="mt-4 text-base font-medium">No projects yet</h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Create your first project to get an AI-powered complexity analysis.
          </p>

          <Link href="/" className="mt-5">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Analyze a project
            </Button>
          </Link>
        </Card>
      )}

      {!isLoading && !error && recentProjects.length > 0 && (
        <div className="grid gap-4">
          {recentProjects.map((project) => (
            <ProjectCard
              key={project.uid}
              project={project}
              onRename={onRename}
              onDelete={onDelete}
              onToggleCompare={onToggleCompare}
              isSelected={selectedProjectIds.includes(project.uid)}
              compareDisabled={
                selectedProjectIds.length >= 2 &&
                !selectedProjectIds.includes(project.uid)
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
