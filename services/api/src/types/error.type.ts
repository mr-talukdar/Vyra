interface ErrorAPI {
  error: {
    code: string;
    message: string;
    requestId: string | undefined;
  };
}

export type { ErrorAPI };
