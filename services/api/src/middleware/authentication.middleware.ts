import type { Request, Response, NextFunction } from "express";
import SupabaseClient from "../supabase/SupabaseClient.js";
import { ErrorMessage } from "../lib/utils.js";

const authenticateAndGetUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).send("Please pass the request headers");

    const authorization = req.headers.authorization.split(" ");

    if (authorization[0]?.toLowerCase() !== "bearer")
      return res.status(401).send("Should be a bearer token");

    const token = authorization[1];
    req.accessToken = token;

    if (!token) return res.status(401).send("Should be a valid token");

    const response = await SupabaseClient.auth.getUser(token);

    if (response.error != null)
      return res.status(401).send("Cannot verify the user");
    if (!response.data.user)
      return res.status(401).send("Cannot fetch the user");

    req.user = response.data.user;
    return next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(ErrorMessage("500", errorMessage, res.locals.requestId));
    return res
      .status(500)
      .send(
        ErrorMessage(
          "INTERNAL_SERVER_ERROR_AUTH_MIDDLEWARE",
          "An internal server error occurred in getting user details",
          res.locals.requestId,
        ),
      );
  }
};
export default authenticateAndGetUser;
