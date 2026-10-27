import { randomUUID } from "node:crypto";
import type { Request, Response, NextFunction } from "express";

const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestID = req.header("x-request-id") ?? randomUUID();
  res.setHeader("x-request-id", requestID);
  res.locals.requestId = requestID;
  next();
};

export { requestIdMiddleware };
