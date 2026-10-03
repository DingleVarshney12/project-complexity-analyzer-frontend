import type { BuildIdeaResponse } from "@/lib/types";
import { apiRequest } from "./api-client";

export async function generateBuildIdea(
  prompt: string,
): Promise<BuildIdeaResponse> {
  return apiRequest<BuildIdeaResponse>("/build-idea/generate", {
    method: "POST",
    body: { prompt },
    fallbackMessage: "Failed to generate project structure.",
  });
}
