import { apiRequest } from "./api-client";

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

export type MessageResponse = {
  message: string;
};

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> {
  return apiRequest<RegisterResponse>("/auth/register", {
    method: "POST",
    body: data,
    fallbackMessage: "Unable to create account.",
  });
}

export async function resendVerificationEmail(
  email: string,
): Promise<MessageResponse> {
  return apiRequest<MessageResponse>("/auth/resend-verification", {
    method: "POST",
    body: {
      email: email.trim(),
    },
    fallbackMessage: "Unable to resend verification email.",
  });
}
export async function loginUser(input: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: input,
    fallbackMessage: "Login failed. Please try again.",
  });
}

export async function logoutUser(): Promise<void> {
  return apiRequest<void>("/auth/logout", {
    method: "POST",
    fallbackMessage: "Logout failed. Please try again.",
  });
}

export async function verifyEmail(token: string): Promise<MessageResponse> {
  return apiRequest<MessageResponse>(
    `/auth/verify-email?token=${encodeURIComponent(token)}`,
    {
      method: "GET",
      fallbackMessage: "Email verification failed.",
    },
  );
}

export async function updateProfile(data: {
  name: string;
}): Promise<MessageResponse> {
  return apiRequest<MessageResponse>("/users/me/profile", {
    method: "PATCH",
    body: data,
    fallbackMessage: "Unable to update your profile.",
  });
}

export async function forgotPassword(email: string): Promise<MessageResponse> {
  return apiRequest<MessageResponse>("/auth/forgot-password", {
    method: "POST",
    body: {
      email: email.trim(),
    },
    fallbackMessage: "Unable to request a password reset.",
  });
}

export async function resetPassword(
  token: string,
  password: string,
): Promise<MessageResponse> {
  return apiRequest<MessageResponse>("/auth/reset-password", {
    method: "POST",
    body: {
      token,
      password,
    },
    fallbackMessage: "Unable to reset your password.",
  });
}
