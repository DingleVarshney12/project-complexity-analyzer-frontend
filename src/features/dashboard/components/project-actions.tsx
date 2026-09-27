import Link from "next/link";
import {
  Ellipsis,
  FolderKanban,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { ProjectApiResponse } from "@/lib/api/projects";

type ProjectActionsProps = {
  project: ProjectApiResponse;
  onRename: (project: ProjectApiResponse) => void;
  onDelete: (project: ProjectApiResponse) => void;
};

export default function ProjectActions({
  project,
  onRename,
  onDelete,
}: ProjectActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Project actions"
            className="h-9 w-9 rounded-lg border border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Ellipsis className="h-4 w-4" />
          </Button>
        }
      />

      <DropdownMenuContent
        align="end"
        className="w-44 rounded-xl border-border/70 bg-background/95 p-1 shadow-xl backdrop-blur-xl"
      >
        {project.analysis && (
          <DropdownMenuItem>
            <Link
              href={`/results/${project.uid}`}
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg"
            >
              <FolderKanban className="h-4 w-4" />
              View Analysis
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={() => onRename(project)}
          className="flex cursor-pointer items-center gap-2 rounded-lg"
        >
          <Pencil className="h-4 w-4" />
          Rename Project
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete(project)}
          className="flex cursor-pointer items-center gap-2 rounded-lg text-red-400 focus:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
          Delete Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}