import { Card } from "@/components/ui/card";

type DashboardStatsProps = {
  total: number;
  analyzed: number;
  averageScore: number | null;
  isLoading: boolean;
};

export default function DashboardStats({
  total,
  analyzed,
  averageScore,
  isLoading,
}: DashboardStatsProps) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      <Card className="glass-card p-5">
        <p className="text-sm text-muted-foreground">Total Projects</p>

        <p className="mt-2 text-3xl font-semibold">{isLoading ? "—" : total}</p>
      </Card>

      <Card className="glass-card p-5">
        <p className="text-sm text-muted-foreground">Analyses Completed</p>

        <p className="mt-2 text-3xl font-semibold">
          {isLoading ? "—" : analyzed}
        </p>
      </Card>

      <Card className="glass-card p-5">
        <p className="text-sm text-muted-foreground">Average Score</p>

        <p className="mt-2 text-3xl font-semibold">
          {isLoading ? "—" : averageScore !== null ? averageScore : "—"}
        </p>
      </Card>
    </div>
  );
}
