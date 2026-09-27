"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  FolderKanban,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteProjectDialog from "@/features/dashboard/components/delete-project-dialog";
import ProjectCard from "@/features/dashboard/components/project-card";
import RenameProjectDialog from "@/features/dashboard/components/rename-project-dialog";
import { useDashboardProjects } from "@/features/dashboard/hooks/use-dashboard-projects";
import { useAuth } from "@/features/auth/context/auth-context";

type ComplexityFilter = "all" | "easy" | "medium" | "hard";

export default function ProjectsPage() {
  const { isLoading: isAuthLoading, isAuthenticated } = useAuth();

  const {
    projects,
    isLoading,
    error,
    loadProjects,
    renameTarget,
    renameValue,
    setRenameValue,
    isRenaming,
    renameError,
    openRenameDialog,
    closeRenameDialog,
    handleRename,
    deleteTarget,
    isDeleting,
    deleteError,
    openDeleteDialog,
    closeDeleteDialog,
    handleDelete,
  } = useDashboardProjects();

  const [searchTerm, setSearchTerm] = useState("");
  const [complexityFilter, setComplexityFilter] =
    useState<ComplexityFilter>("all");

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const searchableText = [
        project.name ?? "",
        project.projectDescription,
        project.analysis?.projectSummary?.type ?? "",
        project.analysis?.features.join(" ") ?? "",
        project.technologies ?? "",
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesComplexity =
        complexityFilter === "all" ||
        project.analysis?.complexity.toLowerCase() ===
          complexityFilter;

      return matchesSearch && matchesComplexity;
    });
  }, [complexityFilter, projects, searchTerm]);

  if (isAuthLoading) {
    return (
      <main className="min-h-[calc(100vh-4rem)] px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="h-8 w-48 rounded bg-blue-500/10" />
          <div className="mt-3 h-4 w-72 rounded bg-blue-500/10" />
          <div className="mt-8 h-56 rounded-2xl bg-blue-500/5" />
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-[calc(100vh-4rem)] px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Card className="glass-card-strong border-0 p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
              <FolderKanban className="h-5 w-5 text-blue-400" />
            </div>

            <h1 className="mt-5 text-2xl font-semibold">
              Sign in to view your projects
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Your saved project analyses will appear here.
            </p>

            <Link
              href="/login"
              className="btn-primary mt-6 inline-flex h-10 items-center justify-center rounded-lg px-5 text-sm"
            >
              Go to login
            </Link>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-[calc(100vh-4rem)] px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-400">
                Workspace
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                My Projects
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Search and manage all your saved project analyses.
              </p>
            </div>

            <Link
              href="/"
              className="btn-primary inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg px-4 text-sm"
            >
              <Plus className="h-4 w-4" />
              Analyze a project
            </Link>
          </div>

          <Card className="glass-card mb-5 border-0 p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-[1fr_190px]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search projects..."
                  aria-label="Search projects"
                  className="h-10 border-blue-300/10 bg-[#070b18]/40 pl-9"
                />
              </div>

              <Select
                value={complexityFilter}
                onValueChange={(value) =>
                  setComplexityFilter(
                    (value as ComplexityFilter | null) ?? "all",
                  )
                }
              >
                <SelectTrigger
                  aria-label="Filter by complexity"
                  className="h-10 w-full border-blue-300/10 bg-[#070b18]/40"
                >
                  <SelectValue placeholder="All complexity" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All complexity</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!isLoading && !error && (
              <p className="mt-3 text-xs text-muted-foreground">
                Showing {filteredProjects.length} of {projects.length}{" "}
                {projects.length === 1 ? "project" : "projects"}
              </p>
            )}
          </Card>

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

              <h2 className="mt-4 text-base font-medium">
                Couldn’t load your projects
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {error}
              </p>

              <Button
                type="button"
                variant="outline"
                onClick={loadProjects}
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

              <h2 className="mt-4 text-base font-medium">
                No projects yet
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                Analyze your first project and it’ll be saved here.
              </p>

              <Link
                href="/"
                className="btn-primary mt-5 inline-flex h-9 items-center justify-center gap-2 rounded-lg px-4 text-sm"
              >
                <Plus className="h-4 w-4" />
                Analyze a project
              </Link>
            </Card>
          )}

          {!isLoading &&
            !error &&
            projects.length > 0 &&
            filteredProjects.length === 0 && (
              <Card className="glass-card flex min-h-56 flex-col items-center justify-center p-8 text-center">
                <Search className="h-6 w-6 text-muted-foreground" />

                <h2 className="mt-4 text-base font-medium">
                  No matching projects
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Try another search or complexity filter.
                </p>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setSearchTerm("");
                    setComplexityFilter("all");
                  }}
                  className="mt-3"
                >
                  Clear filters
                </Button>
              </Card>
            )}

          {!isLoading &&
            !error &&
            filteredProjects.length > 0 && (
              <div className="grid gap-4">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.uid}
                    project={project}
                    onRename={openRenameDialog}
                    onDelete={openDeleteDialog}
                  />
                ))}
              </div>
            )}
        </div>
      </main>

      <RenameProjectDialog
        project={renameTarget}
        value={renameValue}
        onValueChange={setRenameValue}
        error={renameError}
        isRenaming={isRenaming}
        onClose={closeRenameDialog}
        onRename={handleRename}
      />

      <DeleteProjectDialog
        project={deleteTarget}
        error={deleteError}
        isDeleting={isDeleting}
        onClose={closeDeleteDialog}
        onDelete={handleDelete}
      />
    </>
  );
}