"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import OAuthButtons from "./oauth-buttons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  registerUser,
  resendVerificationEmail,
} from "@/lib/api/auth";
import { toast } from "@/components/ui/toast";
export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
const [isResending, setIsResending] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;

    if (password !== confirmPassword) {
      toast.add({
        title: "Passwords do not match",
        description: "Please make sure both passwords are the same.",
        type: "error",
      });

      return;
    }

    setIsLoading(true);

    try {
      const result = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      toast.add({
        title: "Account created",
        description:
          result.message || "Please check your email to verify your account.",
        type: "success",
      });

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.add({
        title: "Signup failed",
        description:
          error instanceof Error ? error.message : "Unable to create account.",
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
          <User className="h-5 w-5 text-blue-400" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          Create Your Account
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Create an account to save and manage your project analyses.
        </p>
      </div>
      <OAuthButtons />

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-blue-300/10" />
        <span className="text-xs text-muted-foreground">OR</span>
        <div className="h-px flex-1 bg-blue-300/10" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>

          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isLoading}
              required
              className="glass-input h-11 border-0 pl-10 focus-visible:ring-1 focus-visible:ring-blue-500/50"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isLoading}
              required
              className="glass-input h-11 border-0 pl-10 focus-visible:ring-1 focus-visible:ring-blue-500/50"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isLoading}
              required
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

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              disabled={isLoading}
              required
              className="glass-input h-11 border-0 pl-10 pr-10 focus-visible:ring-1 focus-visible:ring-blue-500/50"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((value) => !value)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 text-xs text-muted-foreground">
          <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-blue-400/30 bg-blue-400/10">
            <Check className="h-3 w-3 text-blue-400" />
          </div>

          <p className="leading-5">
            By creating an account, you agree to use the Project Complexity
            Analyzer responsibly.
          </p>
        </div>

        <Button
          type="submit"
          disabled={
            isLoading ||
            !name.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
          }
          className="btn-primary h-11 w-full gap-2"
        >
          {isLoading ? (
            <>Creating Account...</>
          ) : (
            <>
              Create Account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-400 transition-colors hover:text-blue-300"
        >
          Sign in
        </Link>
      </div>
      <div className="mt-5 text-center">
  <p className="text-sm text-muted-foreground">
    Already registered but didn&apos;t receive the email?
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
