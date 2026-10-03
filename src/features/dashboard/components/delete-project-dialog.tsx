import { AlertTriangle, RefreshCw } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import type { ProjectApiResponse } from "@/lib/api/projects";

type DeleteProjectDialogProps = {
  project: ProjectApiResponse | null;
  error: string;
  isDeleting: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteProjectDialog({
  project,
  error,
  isDeleting,
  onClose,
  onDelete,
}: DeleteProjectDialogProps) {
  const projectName = project?.name?.trim() || "this project";

  return (
    <Dialog
      open={!!project}
      onOpenChange={(open) => {
        if (!open && !isDeleting) {
          onClose();
        }
      }}
    >
      <DialogContent className="w-full max-w-md rounded-2xl border border-border/70 bg-background p-6 shadow-2xl">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">Delete Project?</h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">{projectName}</span>?
            This action cannot be undone.
          </p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The project and its saved complexity analysis will be permanently
            removed.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>

        <div className="mt-2 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Project"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
