import { createApiError } from "./api-errors";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl() {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return API_URL;
}

export type RegisterResponse = {
  message: string;
};

export type LoginResponse = {
  message: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    avatarUrl: string | null;
  };
};

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> {
  const response = await fetch(
    `${getApiUrl()}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || "Unable to create account",
    );
  }

  return result;
}

export async function resendVerificationEmail(email: string) {
  const response = await fetch(`${getApiUrl()}/auth/resend-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim() }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw createApiError(
      response,
      result,
      "Unable to resend verification email."
    );
  }

  return result;
}
export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  const response = await fetch(
    `${getApiUrl()}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
  throw createApiError(response, result, "Unable to login.");
}

  return result;
}

export async function logoutUser(): Promise<{
  message: string;
}> {
  const response = await fetch(
    `${getApiUrl()}/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || "Unable to logout",
    );
  }

  return result;
}

export async function verifyEmail(
  token: string,
): Promise<{ message: string }> {
  const response = await fetch(
    `${getApiUrl()}/auth/verify-email?token=${encodeURIComponent(token)}`,
    {
      method: "GET",
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || "Email verification failed",
    );
  }

  return result;
}