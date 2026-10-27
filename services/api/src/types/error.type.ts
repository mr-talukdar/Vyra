interface ErrorAPI {
  error: {
    code: string;
    message: string;
    requestId: string;
  };
}

export type { ErrorAPI };
