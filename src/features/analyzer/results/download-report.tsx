"use client";

import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/auth-context";
import { ReportPDF } from "@/lib/pdf/report-pdf";
import type { ProjectResponse } from "@/lib/types";

interface DownloadReportProps {
  result: ProjectResponse;
}

export default function DownloadReport({ result }: DownloadReportProps) {
  const { user } = useAuth();
  const [includeUserDetails, setIncludeUserDetails] = useState(false);

  const projectName =
    result.project_name || result.project_summary.type || "project";

  const safeFileName =
    projectName
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase() || "project";

  const ownerDetails =
    includeUserDetails && user
      ? {
          name: user.name,
          email: user.email,
        }
      : null;

  return (
    <PDFDownloadLink
      document={<ReportPDF result={result} ownerDetails={ownerDetails} />}
      fileName={`${safeFileName}-complexity-report.pdf`}
    >
      {({ loading }) => (
        <div className="flex flex-col items-start gap-3">
          {user && (
            <div className="flex items-center gap-2">
              <input
                id="include-user-details"
                type="checkbox"
                checked={includeUserDetails}
                onChange={(event) =>
                  setIncludeUserDetails(event.target.checked)
                }
                disabled={loading}
                className="h-4 w-4 accent-blue-500"
              />
              <label
                htmlFor="include-user-details"
                className="cursor-pointer text-sm text-muted-foreground"
              >
                Include my name and email in the report
              </label>
            </div>
          )}

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
        </div>
      )}
    </PDFDownloadLink>
  );
}