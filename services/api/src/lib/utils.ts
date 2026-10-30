import type { ErrorAPI } from "../types/error.type.js";

export const ErrorMessage = (
  code: string,
  message: string,
  requestId?: string,
): ErrorAPI => {
  return {
    error: {
      code,
      message,
      requestId,
    },
  };
};

export const AuthApiResponse = (
  status: Number,
  message: string,
  id: string | number,
  access_token: string,
  refresh_token: string,
  expires_at: number | undefined,
) => {
  return {
    status,
    message,
    id,
    access_token,
    refresh_token,
    expires_at,
  };
};
