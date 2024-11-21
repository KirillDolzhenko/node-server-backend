import http from "http";
import { sendError } from "../sendResponse";

export function ErrorBadRequest(
  res: http.ServerResponse<http.IncomingMessage>,
  details?: object,
) {
  sendError(res, 400, "Bad Request", "Validation failed", details);
}

export function ErrorUnauthorized(
  res: http.ServerResponse<http.IncomingMessage>,
) {
  sendError(res, 401, "Unauthorized");
}

export function ErrorForbidden(res: http.ServerResponse<http.IncomingMessage>) {
  sendError(res, 403, "Forbidden");
}

export function ErrorNotFound(res: http.ServerResponse<http.IncomingMessage>) {
  sendError(res, 404, "Not Found");
}

export function ErrorNotFoundRoute(
  res: http.ServerResponse<http.IncomingMessage>,
) {
  sendError(res, 404, "Not Found", "Unsupported route");
}

export function ErrorConflict(res: http.ServerResponse<http.IncomingMessage>) {
  sendError(res, 409, "Conflict", "The provided data is already in use");
}

export function ErrorInternalServer(
  res: http.ServerResponse<http.IncomingMessage>,
) {
  sendError(
    res,
    500,
    "Internal Server Error",
    "An unexpected error occurred. Please try again later",
  );
}
