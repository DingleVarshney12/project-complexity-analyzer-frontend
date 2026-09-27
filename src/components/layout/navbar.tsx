"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { COMPANY_NAME } from "@/lib/constant";
import { Logo } from "../shared/logo";
import { useAuth } from "@/features/auth/context/auth-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();

  const { user, isLoading, isAuthenticated, logout } = useAuth();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();

      closeMenu();

      toast.add({
        title: "Logged out",
        description: "You have been logged out successfully.",
        type: "success",
      });

      router.push("/");
      router.refresh();
    } catch {
      toast.add({
        title: "Logout failed",
        description: "Unable to log out. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-blue-300/10 bg-[#070b18]/75 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* ========================================================= */}
          {/* Logo */}
          {/* ========================================================= */}

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

          {/* ========================================================= */}
          {/* Desktop Navigation */}
          {/* ========================================================= */}

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

          {/* ========================================================= */}
          {/* Desktop Auth */}
          {/* ========================================================= */}

          <div className="hidden items-center md:flex">
            {isLoading ? (
              <div className="h-9 w-28 animate-pulse rounded-lg bg-blue-500/10" />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                {/* ================================================= */}
                {/* User Trigger */}
                {/* ================================================= */}

                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="h-10 gap-2 rounded-lg px-2.5 text-slate-200 hover:bg-blue-500/10 hover:text-white"
                    >
                      <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-blue-400/20 bg-blue-500/10">
                        {user.avatarUrl ? (
                          <Image
                            src={user.avatarUrl}
                            alt=""
                            width={100}
                            height={100}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="h-4 w-4 text-blue-400" />
                        )}
                      </div>

                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  }
                />

                {/* ================================================= */}
                {/* Dropdown */}
                {/* ================================================= */}

                <DropdownMenuContent
                  align="end"
                  className="w-60 border-blue-300/10 bg-[#0c1328]/95 p-1 backdrop-blur-xl"
                >
                  {/* User information */}

                  <div className="px-2 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-400/20 bg-blue-500/10">
                        {user.avatarUrl ? (
                          <Image
                            width={100}
                            height={100}
                            src={user.avatarUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="h-4 w-4 text-blue-400" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {user.name || "User"}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="bg-blue-300/10" />

                  {/* Dashboard */}

                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard")}
                    className="cursor-pointer"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>

                  {/* My Projects */}

                  <DropdownMenuItem
                    onClick={() => router.push("/projects")}
                    className="cursor-pointer"
                  >
                    <FolderKanban className="h-4 w-4" />
                    My Projects
                  </DropdownMenuItem>

                  {/* Settings */}

                  <DropdownMenuItem
                    onClick={() => router.push("/settings")}
                    className="cursor-pointer"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-blue-300/10" />

                  {/* Logout */}

                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />

                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                {/* Login */}

                <Link href="/login" className="btn-ghost">
                  Login
                </Link>

                {/* Sign Up */}

                <Link
                  href="/signup"
                  className="btn-primary inline-flex h-9 items-center px-4"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* Mobile Menu Button */}
          {/* ========================================================= */}

          <Button
            type="button"
            size="icon"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/5 text-slate-200 transition hover:bg-blue-500/10 md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* =========================================================== */}
        {/* Mobile Navigation */}
        {/* =========================================================== */}

        {isOpen && (
          <nav className="border-t border-blue-300/10 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {/* Analyze */}

              <Link
                href="/"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-blue-500/10 hover:text-white"
              >
                Analyze
              </Link>

              {/* How It Works */}

              <Link
                href="/how-it-works"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-blue-500/10 hover:text-white"
              >
                How It Works
              </Link>

              {/* About */}

              <Link
                href="/about"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-blue-500/10 hover:text-white"
              >
                About
              </Link>

              <div className="mt-2 border-t border-blue-300/10 pt-2">
                {isLoading ? (
                  <div className="mx-3 h-10 animate-pulse rounded-lg bg-blue-500/10" />
                ) : isAuthenticated && user ? (
                  <>
                    {/* ================================================= */}
                    {/* Mobile User Header */}
                    {/* ================================================= */}

                    <div className="flex items-center gap-3 px-3 py-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-400/20 bg-blue-500/10">
                        {user.avatarUrl ? (
                          <Image
                            width={100}
                            height={100}
                            src={user.avatarUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="h-4 w-4 text-blue-400" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-200">
                          {user.name || "User"}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Dashboard */}

                    <Link
                      href="/dashboard"
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-blue-500/10 hover:text-white"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>

                    {/* My Projects */}

                    <Link
                      href="/projects"
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-blue-500/10 hover:text-white"
                    >
                      <FolderKanban className="h-4 w-4" />
                      My Projects
                    </Link>

                    {/* Settings */}

                    <Link
                      href="/settings"
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-blue-500/10 hover:text-white"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>

                    {/* Logout */}

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                    >
                      <LogOut className="h-4 w-4" />

                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </>
                ) : (
                  <>
                    {/* Login */}

                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-blue-500/10 hover:text-white"
                    >
                      Login
                    </Link>

                    {/* Sign Up */}

                    <Link
                      href="/signup"
                      onClick={closeMenu}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-blue-400 transition hover:bg-blue-500/10 hover:text-blue-300"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
