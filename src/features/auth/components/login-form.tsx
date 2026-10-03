"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import OAuthButtons from "./oauth-buttons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useAuth } from "../context/auth-context";
import { loginUser, resendVerificationEmail } from "@/lib/api/auth";
export default function LoginForm() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;

    if (!email.trim() || !password) {
      toast.add({
        title: "Missing information",
        description: "Please enter your email and password.",
        type: "error",
      });

      return;
    }

    setIsLoading(true);

    try {
      await loginUser({
        email: email.trim(),
        password,
      });
      await refreshUser();
      toast.add({
        title: "Login successful",
        description: "Welcome back!",
        type: "success",
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Login failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to login. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendVerification = async () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail || isResending) return;

    setIsResending(true);

    try {
      const result = await resendVerificationEmail(normalizedEmail);

      toast.add({
        title: "Verification email sent",
        description:
          result?.message || "Check your inbox and spam folder for the link.",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Unable to resend email",
        description:
          error instanceof Error ? error.message : "Please try again.",
        type: "error",
      });
    } finally {
      setIsResending(false);
    }
  };
  return (
    <Card className="glass-card-strong w-full p-6 sm:p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
          <Lock className="h-5 w-5 text-blue-400" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to continue to Project Complexity Analyzer.
        </p>
      </div>
      <OAuthButtons />

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-blue-300/10" />
        <span className="text-xs text-muted-foreground">OR</span>
        <div className="h-px flex-1 bg-blue-300/10" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isLoading}
              className="glass-input h-11 border-0 pl-10 focus-visible:ring-1 focus-visible:ring-blue-500/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

            <Link
              href="/forgot-password"
              className="text-xs text-blue-400 transition-colors hover:text-blue-300"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isLoading}
              className="glass-input h-11 border-0 pl-10 pr-10 focus-visible:ring-1 focus-visible:ring-blue-500/50"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="btn-primary h-11 w-full gap-2"
        >
          {isLoading ? "Signing In..." : "Sign In"}

          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-blue-400 transition-colors hover:text-blue-300"
        >
          Create one
        </Link>
      </div>
      <div className="mt-5 text-center">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the verification email?
        </p>

        <Button
          type="button"
          variant="ghost"
          onClick={handleResendVerification}
          disabled={!email.trim() || isLoading || isResending}
          className="mt-1 text-blue-400 hover:text-blue-300"
        >
          {isResending ? "Sending..." : "Resend verification email"}
        </Button>
      </div>
    </Card>
  );
}
