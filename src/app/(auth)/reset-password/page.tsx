"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { CheckCircle2, KeyRound, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/api/auth";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setError("");

    if (!token) {
      setError("This reset link is invalid or missing its token.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword(token, password);
      setSuccess(true);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to reset your password. Please request a new link.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card-strong border-0 p-6 sm:p-8">
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
          {success ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          ) : (
            <KeyRound className="h-5 w-5 text-blue-400" />
          )}
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          {success ? "Password updated" : "Set a new password"}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {success
            ? "Your password was changed. You can now log in."
            : "Choose a new password for your account."}
        </p>
      </div>

      {success ? (
        <Link
          href="/login"
          className="btn-primary flex h-11 w-full items-center justify-center rounded-lg"
        >
          Continue to login
        </Link>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="new-password">New password</Label>
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={100}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              disabled={isSubmitting}
              className="glass-input h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={100}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              disabled={isSubmitting}
              className="glass-input h-11"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !token}
            className="btn-primary h-11 w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Reset password"
            )}
          </Button>
        </form>
      )}
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-6">
      <div className="w-full max-w-md">
        <Suspense
          fallback={
            <Card className="glass-card-strong p-8 text-center">
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-400" />
              <p className="mt-3 text-sm text-muted-foreground">
                Loading reset page...
              </p>
            </Card>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
