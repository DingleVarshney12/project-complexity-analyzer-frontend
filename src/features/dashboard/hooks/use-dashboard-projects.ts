"use client";

import { useCallback, useEffect, useState } from "react";

import {
  deleteProject,
  getProjects,
  renameProject,
  type ProjectApiResponse,
} from "@/lib/api/projects";

export function useDashboardProjects() {
  const [projects, setProjects] = useState<ProjectApiResponse[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------------------------------------------------
  // Rename state
  // ---------------------------------------------------------

  const [renameTarget, setRenameTarget] = useState<ProjectApiResponse | null>(
    null,
  );

  const [renameValue, setRenameValue] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameError, setRenameError] = useState("");

  // ---------------------------------------------------------
  // Delete state
  // ---------------------------------------------------------

  const [deleteTarget, setDeleteTarget] = useState<ProjectApiResponse | null>(
    null,
  );

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // ---------------------------------------------------------
  // Load projects
  // ---------------------------------------------------------

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load your projects.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchInitialProjects = async () => {
      try {
        const data = await getProjects();

        if (cancelled) return;

        setProjects(data);
        setError("");
      } catch (error) {
        if (cancelled) return;

        console.error("Failed to load projects:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load your projects.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchInitialProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  // ---------------------------------------------------------
  // Rename
  // ---------------------------------------------------------

  const openRenameDialog = useCallback((project: ProjectApiResponse) => {
    setRenameTarget(project);
    setRenameValue(project.name ?? "");
    setRenameError("");
  }, []);

  const closeRenameDialog = useCallback(() => {
    if (isRenaming) return;

    setRenameTarget(null);
    setRenameValue("");
    setRenameError("");
  }, [isRenaming]);

  const handleRename = useCallback(async () => {
    if (!renameTarget) return;

    const trimmedName = renameValue.trim();

    if (!trimmedName) {
      setRenameError("Project name cannot be empty.");
      return;
    }

    if (trimmedName.length > 200) {
      setRenameError("Project name cannot exceed 200 characters.");
      return;
    }

    setIsRenaming(true);
    setRenameError("");

    try {
      const updatedProject = await renameProject(renameTarget.uid, trimmedName);

      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project.uid === updatedProject.uid ? updatedProject : project,
        ),
      );

      setRenameTarget(null);
      setRenameValue("");
      setRenameError("");
    } catch (error) {
      console.error("Failed to rename project:", error);

      setRenameError(
        error instanceof Error ? error.message : "Failed to rename project.",
      );
    } finally {
      setIsRenaming(false);
    }
  }, [renameTarget, renameValue]);

  // ---------------------------------------------------------
  // Delete
  // ---------------------------------------------------------

  const openDeleteDialog = useCallback((project: ProjectApiResponse) => {
    setDeleteTarget(project);
    setDeleteError("");
  }, []);

  const closeDeleteDialog = useCallback(() => {
    if (isDeleting) return;

    setDeleteTarget(null);
    setDeleteError("");
  }, [isDeleting]);

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    setDeleteError("");

    try {
      await deleteProject(deleteTarget.uid);

      setProjects((currentProjects) =>
        currentProjects.filter((project) => project.uid !== deleteTarget.uid),
      );

      setDeleteTarget(null);
      setDeleteError("");
    } catch (error) {
      console.error("Failed to delete project:", error);

      setDeleteError(
        error instanceof Error ? error.message : "Failed to delete project.",
      );
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTarget]);

  return {
    // Projects
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
  };
}
