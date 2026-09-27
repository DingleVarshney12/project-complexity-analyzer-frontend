"use client";

import { Button } from "@/components/ui/button";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return API_URL;
}
function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.071 1.532 1.032 1.532 1.032.892 1.529 2.341 1.087 2.91.831.091-.646.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.58 9.58 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.936.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48A10.001 10.001 0 0 0 22 12C22 6.477 17.523 2 12 2Z" />
    </svg>
  );
}
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.71-.06-1.4-.18-2.06H12v3.9h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.23Z"
      />
      <path
        fill="#34A853"
        d="M12 21.99c2.63 0 4.84-.87 6.45-2.49l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.99Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.94a5.86 5.86 0 0 1 0-3.75V7.66H3.3a9.99 9.99 0 0 0 0 8.81l3.24-2.53Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.16c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.21 14.62 2.01 12 2.01a9.74 9.74 0 0 0-8.7 5.65l3.24 2.53C7.31 7.88 9.46 6.16 12 6.16Z"
      />
    </svg>
  );
}

export default function OAuthButtons() {

  const handleGoogleLogin = () => {
  window.location.assign(`${getApiUrl()}/auth/google`);
};

const handleGithubLogin = () => {
  window.location.assign(`${getApiUrl()}/auth/github`);
};
  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
        className="h-11 w-full gap-3 border-blue-300/10 bg-background/40 text-foreground hover:bg-blue-500/10"
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={handleGithubLogin}
        className="h-11 w-full gap-3 border-blue-300/10 bg-background/40 text-foreground hover:bg-blue-500/10"
      >
        <GithubIcon />
        Continue with GitHub
      </Button>
    </div>
  );
}
