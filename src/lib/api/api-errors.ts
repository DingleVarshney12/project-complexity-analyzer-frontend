export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly code: string,
    public readonly details: unknown = null,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function codeForStatus(status: number): string {
  switch (status) {
    case 400:
      return "VALIDATION_ERROR";
    case 401:
      return "AUTH_REQUIRED";
    case 403:
      return "FORBIDDEN";
    case 404:
      return "RESOURCE_NOT_FOUND";
    case 409:
      return "CONFLICT";
    case 422:
      return "INVALID_INPUT";
    case 503:
      return "DEPENDENCY_UNAVAILABLE";
    default:
      return "INTERNAL_ERROR";
  }
}

export function createApiError(
  response: Response,
  payload: unknown,
  fallbackMessage: string,
): ApiError {
  const body =
    payload && typeof payload === "object"
      ? (payload as Record<string, unknown>)
      : {};

  const rawMessage = body.message ?? body.detail;

  const message = Array.isArray(rawMessage)
    ? rawMessage.join(" ")
    : typeof rawMessage === "string"
      ? rawMessage
      : fallbackMessage;

  return new ApiError(
    message,
    response.status,
    typeof body.code === "string" ? body.code : codeForStatus(response.status),
    body.details ?? (Array.isArray(rawMessage) ? rawMessage : null),
  );
}

export function createNetworkError(): ApiError {
  return new ApiError(
    "Can’t connect to the server. Check that the backend is running and try again.",
    0,
    "NETWORK_ERROR",
  );
}
