"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ProjectCompareBarProps = {
  selectedIds: string[];
  scopeLabel: string;
  onClear: () => void;
};

export default function ProjectCompareBar({
  selectedIds,
  scopeLabel,
  onClear,
}: ProjectCompareBarProps) {
  const router = useRouter();

  if (selectedIds.length === 0) return null;

  const compareUrl =
    selectedIds.length === 2
      ? `/compare?first=${encodeURIComponent(selectedIds[0])}&second=${encodeURIComponent(selectedIds[1])}`
      : null;

  return (
    <Card className="glass-card mb-5 flex flex-col gap-3 border-blue-400/20 p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        {selectedIds.length} of 2 projects selected from your {scopeLabel}.
      </p>

      <div className="flex gap-2">
        <Button type="button" variant="ghost" onClick={onClear}>
          Clear
        </Button>

        <Button
          type="button"
          disabled={!compareUrl}
          onClick={() => {
            if (compareUrl) router.push(compareUrl);
          }}
          className="btn-primary"
        >
          Compare projects
        </Button>
      </div>
    </Card>
  );
}
