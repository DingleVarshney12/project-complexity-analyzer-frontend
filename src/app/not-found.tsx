import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-12 sm:px-6">
      <Card className="glass-card-strong w-full max-w-xl border-0 p-8 text-center sm:p-12">
        <p className="text-sm font-semibold tracking-[0.25em] text-blue-400">
          404
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Page not found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          The page you&apos;re looking for may have moved or doesn&apos;t exist.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/">
            <Button className="btn-primary gap-2">
              <Home className="h-4 w-4" />
              Go to home
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
