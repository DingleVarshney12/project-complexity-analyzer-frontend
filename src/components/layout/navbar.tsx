"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import {COMPANY_NAME} from "@/lib/constant"

export default function Navbar() {

  return (
    <header className="sticky top-0 z-50 border-b border-blue-300/10 bg-[#070b18]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.12)]">
            <Sparkles className="h-4 w-4 text-blue-400" />
          </div>

          <span className="text-sm font-semibold tracking-tight text-slate-100">
            {COMPANY_NAME}
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="btn-ghost"
          >
            Analyze
          </Link>

          <Link
            href="/how-it-works"
            className="btn-ghost"
          >
            How It Works
          </Link>

          <Link
            href="/about"
            className="btn-ghost"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}