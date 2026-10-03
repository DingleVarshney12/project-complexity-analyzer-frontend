"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-12 sm:px-6">
      <Card className="glass-card-strong w-full max-w-xl border-0 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-red-400/20 bg-red-500/10">
          <RefreshCw className="h-5 w-5 text-red-400" />
        </div>

        <h1 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
          Something went wrong
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          This page ran into an unexpected problem. Try again, or return home.
        </p>

        {error.digest && (
          <p className="mt-3 text-xs text-muted-foreground">
            Error reference: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={reset} className="btn-primary gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>

          <Link href="/">
            <Button variant="outline">Go to home</Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
