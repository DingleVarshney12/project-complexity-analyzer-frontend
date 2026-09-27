import { RefreshCw } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { ProjectApiResponse } from "@/lib/api/projects";

type RenameProjectDialogProps = {
  project: ProjectApiResponse | null;
  value: string;
  onValueChange: (value: string) => void;
  error: string;
  isRenaming: boolean;
  onClose: () => void;
  onRename: () => void;
};

export default function RenameProjectDialog({
  project,
  value,
  onValueChange,
  error,
  isRenaming,
  onClose,
  onRename,
}: RenameProjectDialogProps) {
  return (
    <Dialog
      open={!!project}
      onOpenChange={(open) => {
        if (!open && !isRenaming) {
          onClose();
        }
      }}
    >
      <DialogContent className="w-full max-w-md rounded-2xl border border-border/70 bg-background p-6 shadow-2xl">
        <div>
          <h2 className="text-lg font-semibold">Rename Project</h2>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Choose a name that helps you identify this project.
          </p>
        </div>

        <div className="mt-2">
          <Label htmlFor="project-name" className="text-sm font-medium">
            Project name
          </Label>

          <Input
            id="project-name"
            type="text"
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onRename();
              }

              if (event.key === "Escape" && !isRenaming) {
                onClose();
              }
            }}
            maxLength={200}
            autoFocus
            placeholder="Enter project name"
            className="mt-2 h-11 rounded-lg border-border bg-background text-sm focus:border-blue-400/60 focus:ring-blue-400/10"
          />

          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>

        <div className="mt-2 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isRenaming}
          >
            Cancel
          </Button>

          <Button
            type="button"
            className="btn-primary"
            onClick={onRename}
            disabled={isRenaming}
          >
            {isRenaming ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
