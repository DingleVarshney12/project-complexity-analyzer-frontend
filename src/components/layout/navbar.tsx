"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {Button} from "@/components/ui/button"
import { COMPANY_NAME } from "@/lib/constant";
import { Logo } from "../shared/logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blue-300/10 bg-[#070b18]/75 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-blue-400/20 bg-blue-500/10 p-0.5 shadow-[0_0_20px_rgba(59,130,246,0.12)]">
              <Logo />
            </div>

            <span className="text-sm font-semibold tracking-tight text-slate-100">
              {COMPANY_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link href="/" className="btn-ghost">
              Analyze
            </Link>

            <Link href="/how-it-works" className="btn-ghost">
              How It Works
            </Link>

            <Link href="/about" className="btn-ghost">
              About
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <Button
            type="button"
            size="icon"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/5 text-slate-200 transition hover:bg-blue-500/10 md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="border-t border-blue-300/10 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-blue-500/10 hover:text-white"
              >
                Analyze
              </Link>

              <Link
                href="/how-it-works"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-blue-500/10 hover:text-white"
              >
                How It Works
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-blue-500/10 hover:text-white"
              >
                About
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
