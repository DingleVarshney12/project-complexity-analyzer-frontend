"use client";
import DashboardHeader from "@/features/dashboard/components/dashboard-header";
import DashboardStats from "@/features/dashboard/components/dashboard-stats";
import DeleteProjectDialog from "@/features/dashboard/components/delete-project-dialog";
import ProjectsSection from "@/features/dashboard/components/projects-section";
import RenameProjectDialog from "@/features/dashboard/components/rename-project-dialog";
import ProjectCompareBar from "@/features/projects/components/project-compare-bar";
import { useProjectComparison } from "@/features/projects/hooks/use-project-comparison";
import { useDashboardProjects } from "@/features/dashboard/hooks/use-dashboard-projects";
import { calculateDashboardStats } from "@/features/dashboard/utils/dashboard-utils";
import ComplexityDistribution from "@/features/dashboard/components/complexity-distribution";

export default function DashboardPage() {
  const { selectedProjectIds, toggleProject, clearSelection } =
    useProjectComparison();
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

          <ComplexityDistribution projects={projects} isLoading={isLoading} />
          <ProjectCompareBar
            selectedIds={selectedProjectIds}
            scopeLabel="recent projects"
            onClear={clearSelection}
          />

          <ProjectsSection
            projects={projects}
            isLoading={isLoading}
            error={error}
            onRetry={loadProjects}
            onRename={openRenameDialog}
            onDelete={openDeleteDialog}
            onToggleCompare={toggleProject}
            selectedProjectIds={selectedProjectIds}
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
