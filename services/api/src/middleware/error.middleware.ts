import type { NextFunction, Request, Response } from "express";
import type { ErrorAPI } from "../types/error.type.js";
const generic404Handler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  return res.json({
    error: {
      code: "NOT_FOUND",
      message: "Route not found",
      requestId: res.locals.requestId,
    },
  });
};

const genericErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  res.status(500);
  res.json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal server error occurred",
      requestId: res.locals.requestId,
    },
  });
};

export { generic404Handler, genericErrorHandler };
