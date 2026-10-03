"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectResponse } from "@/lib/types";
import { ReportPDF } from "@/lib/pdf/report-pdf";

interface DownloadReportProps {
  result: ProjectResponse;
}

export default function DownloadReport({ result }: DownloadReportProps) {
  const projectName =
    result.project_name || result.project_summary.type || "project";

  const safeFileName =
    projectName
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase() || "project";
  return (
    <PDFDownloadLink
      document={<ReportPDF result={result} />}
      fileName={`${safeFileName}-complexity-report.pdf`}
    >
      {({ loading }) => (
        <Button
          type="button"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download Report
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
