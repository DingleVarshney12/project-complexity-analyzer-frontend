import type { BuildIdeaResponse } from "@/lib/types";
import { createApiError } from "./api-errors";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateBuildIdea(
  prompt: string,
): Promise<BuildIdeaResponse> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/build-idea/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ prompt }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw createApiError(
      response,
      result,
      "Failed to generate project structure.",
    );
  }

  return response.json();
}
