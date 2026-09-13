import Link from "next/link";
import {
  Heart,
} from "lucide-react";
import {
  COMPANY_NAME
} from "@/lib/constant"
import {Logo} from "../shared/logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#050914]/80">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/10 bg-blue-400/10 transition-colors group-hover:bg-blue-400/15">
                <Logo />
              </div>

              <span className="text-sm font-semibold">
                {COMPANY_NAME}
              </span>
            </Link>

            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              Understand your project complexity, identify technical
              requirements, and plan your development with AI.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Analyze
            </Link>

            <Link
              href="/how-it-works"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>

            <Link
              href="/about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>

            {/* <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a> */}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Project Complexity Analyzer. All
            rights reserved.
          </p>

          <p className="inline-flex items-center gap-1.5">
            Built with
            <Heart className="h-3.5 w-3.5 text-red-400" />
            for developers
          </p>
        </div>
      </div>
    </footer>
  );
}