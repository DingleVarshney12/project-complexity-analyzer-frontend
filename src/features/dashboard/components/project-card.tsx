import { FolderKanban } from "lucide-react";

import { Card } from "@/components/ui/card";

import type { ProjectApiResponse } from "@/lib/api/projects";

import ProjectActions from "./project-actions";
import {
  formatDate,
  getComplexityClass,
  getProjectTitle,
} from "../utils/dashboard-utils";

type ProjectCardProps = {
  project: ProjectApiResponse;
  onRename: (project: ProjectApiResponse) => void;
  onDelete: (project: ProjectApiResponse) => void;
};

export default function ProjectCard({
  project,
  onRename,
  onDelete,
}: ProjectCardProps) {
  const analysis = project.analysis;
  const projectTitle = getProjectTitle(project);

  return (
    <Card className="glass-card p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/10">
              <FolderKanban className="h-4 w-4 text-blue-400" />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold">
                {projectTitle}
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                Created {formatDate(project.createdAt)}
              </p>
            </div>
          </div>

          <p className="mt-4 line-clamp-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {project.projectDescription}
          </p>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
          {analysis ? (
            <>
              <div
                className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium ${getComplexityClass(
                  analysis.complexity,
                )}`}
              >
                {analysis.complexity}
              </div>

              <div className="text-center sm:min-w-16">
                <p className="text-xl font-semibold">
                  {analysis.score}
                </p>

                <p className="text-[11px] text-muted-foreground">
                  Score
                </p>
              </div>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">
              Analysis unavailable
            </span>
          )}

          <ProjectActions
            project={project}
            onRename={onRename}
            onDelete={onDelete}
          />
        </div>
      </div>
    </Card>
  );
}