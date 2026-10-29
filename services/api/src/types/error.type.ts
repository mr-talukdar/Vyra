interface ErrorAPI {
  error: {
    code: string;
    message: string;
    requestId: string | undefined;
  };
}

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

export type { ErrorAPI };
