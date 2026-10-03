import { createApiError, createNetworkError } from "./api-errors";

type JsonRequestOptions = {
  method?: string;
  body?: unknown;
  cache?: RequestCache;
  fallbackMessage: string;
};
export async function apiRequest<T>(
  path: string,
  options: JsonRequestOptions,
): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const baseUrl = apiUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  let response: Response;

  try {
    response = await fetch(`${baseUrl}${normalizedPath}`, {
      method: options.method ?? "GET",
      headers:
        options.body === undefined
          ? undefined
          : { "Content-Type": "application/json" },
      credentials: "include",
      body:
        options.body === undefined ? undefined : JSON.stringify(options.body),
      cache: options.cache,
    });
  } catch {
    throw createNetworkError();
  }

  const payload: unknown =
    response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw createApiError(response, payload, options.fallbackMessage);
  }

  return payload as T;
}
