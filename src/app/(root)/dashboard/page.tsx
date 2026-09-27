"use client";

import DashboardHeader from "@/features/dashboard/components/dashboard-header";
import DashboardStats from "@/features/dashboard/components/dashboard-stats";
import DeleteProjectDialog from "@/features/dashboard/components/delete-project-dialog";
import ProjectsSection from "@/features/dashboard/components/projects-section";
import RenameProjectDialog from "@/features/dashboard/components/rename-project-dialog";

import { useDashboardProjects } from "@/features/dashboard/hooks/use-dashboard-projects";
import { calculateDashboardStats } from "@/features/dashboard/utils/dashboard-utils";

export default function DashboardPage() {
  const {
    projects,
    isLoading,
    error,
    loadProjects,

    // Rename
    renameTarget,
    renameValue,
    setRenameValue,
    isRenaming,
    renameError,
    openRenameDialog,
    closeRenameDialog,
    handleRename,

    // Delete
    deleteTarget,
    isDeleting,
    deleteError,
    openDeleteDialog,
    closeDeleteDialog,
    handleDelete,
  } = useDashboardProjects();

  const stats = calculateDashboardStats(projects);

  return (
    <>
      <main className="min-h-[calc(100vh-4rem)] px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <DashboardHeader />

          <DashboardStats
            total={stats.total}
            analyzed={stats.analyzed}
            averageScore={stats.averageScore}
            isLoading={isLoading}
          />

          <ProjectsSection
            projects={projects}
            isLoading={isLoading}
            error={error}
            onRetry={loadProjects}
            onRename={openRenameDialog}
            onDelete={openDeleteDialog}
          />
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