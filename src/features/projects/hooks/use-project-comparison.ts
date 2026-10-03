"use client";

import { useState } from "react";

export function useProjectComparison() {
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);

  const toggleProject = (uid: string) => {
    setSelectedProjectIds((current) => {
      if (current.includes(uid)) {
        return current.filter((id) => id !== uid);
      }

      if (current.length >= 2) return current;

      return [...current, uid];
    });
  };

  const clearSelection = () => setSelectedProjectIds([]);

  return {
    selectedProjectIds,
    toggleProject,
    clearSelection,
  };
}
