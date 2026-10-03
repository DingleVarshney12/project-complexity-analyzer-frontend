"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Save, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { useAuth } from "@/features/auth/context/auth-context";
import { updateProfile } from "@/lib/api/auth";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading, refreshUser, logout } = useAuth();
  const [name, setName] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSave = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = (name ?? user?.name ?? "").trim();
    if (trimmedName.length < 2) {
      toast.add({
        title: "Name is too short",
        description: "Please enter at least 2 characters.",
        type: "error",
      });
      return;
    }

    setIsSaving(true);

    try {
      await updateProfile({ name: trimmedName });
      await refreshUser();

      toast.add({
        title: "Profile updated",
        description: "Your name has been saved.",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Update failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to update your profile.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logout();
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Logout failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to log out. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-4rem)] px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl animate-pulse">
          <div className="h-8 w-40 rounded bg-blue-500/10" />
          <div className="mt-3 h-4 w-64 rounded bg-blue-500/10" />
          <div className="mt-8 h-56 rounded-2xl bg-blue-500/5" />
        </div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-[calc(100vh-4rem)] px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your account details.
          </p>
        </div>

        <Card className="glass-card-strong border-0 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-blue-400/20 bg-blue-500/10">
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatarUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-blue-400" />
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate font-medium text-white">
                {user.name || "Your account"}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="settings-name">Name</Label>
              <Input
                id="settings-name"
                name="name"
                value={name ?? user.name ?? ""}
                onChange={(event) => setName(event.target.value)}
                minLength={2}
                maxLength={100}
                required
                disabled={isSaving}
                className="glass-input h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="settings-email">Email</Label>
              <Input
                id="settings-email"
                value={user.email}
                disabled
                readOnly
                className="glass-input h-11 opacity-70"
              />
              <p className="text-xs text-muted-foreground">
                Email address can’t be changed here.
              </p>
            </div>

            <Button className="btn-primary" type="submit" disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </form>

          <div className="my-7 border-t border-blue-300/10" />

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-medium">Log out</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign out of your account on this device.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="border-red-400/20 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Log out"}
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
