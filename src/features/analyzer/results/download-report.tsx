"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import {Button } from "@/components/ui/button"
import type { ProjectResponse } from "@/lib/types";
import { ReportPDF } from "@/lib/pdf/report-pdf";

interface DownloadReportProps {
  result: ProjectResponse;
}

export default function DownloadReport({
  result,
}: DownloadReportProps) {
  return (
    <PDFDownloadLink
      document={<ReportPDF result={result} />}
      fileName="project-complexity-report.pdf"
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