"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Loader2,
  XCircle,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { verifyEmail } from "@/lib/api/auth";

type VerificationState = "loading" | "success" | "error";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, setState] =
    useState<VerificationState>(
      token ? "loading" : "error",
    );

  const [message, setMessage] = useState(
    token
      ? "Verifying your email..."
      : "Verification token is missing.",
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    const verify = async () => {
      try {
        const result = await verifyEmail(token);

        setState("success");
        setMessage(
          result.message ||
            "Your email has been verified successfully.",
        );
      } catch (error: unknown) {
        setState("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Email verification failed.",
        );
      }
    };

    void verify();
  }, [token]);

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-6">
      <div className="w-full max-w-md">
        <Card className="glass-card-strong w-full border-0 p-6 text-center sm:p-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10">
            {state === "loading" && (
              <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
            )}

            {state === "success" && (
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            )}

            {state === "error" && (
              <XCircle className="h-6 w-6 text-red-400" />
            )}
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            {state === "loading" && "Verifying Email"}
            {state === "success" && "Email Verified"}
            {state === "error" && "Verification Failed"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {message}
          </p>

          {state === "success" && (
            <Button className="btn-primary mt-6 w-full">
              <Link href="/login">Continue to Login</Link>
            </Button>
          )}

          {state === "error" && (
            <Button
              variant="outline"
              className="mt-6 w-full"
            >
              <Link href="/login">Back to Login</Link>
            </Button>
          )}
        </Card>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-6">
          <Card className="glass-card-strong p-8 text-center">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" />
            <p className="mt-3 text-sm text-muted-foreground">
              Loading verification...
            </p>
          </Card>
        </main>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}