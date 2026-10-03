import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Dashboard</p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Your Projects
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          View and manage your projects and their complexity analyses.
        </p>
      </div>

      <Link href="/">
        <Button className="btn-primary gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </Link>
    </div>
  );
}
