import type { Request, Response } from "express";
import SupabaseClient from "../supabase/SupabaseClient.js";
import { AuthApiResponse, ErrorMessage } from "../lib/utils.js";
import { UserDetailSchema } from "../zod/auth.schema.js";

const signInController = async (req: Request, res: Response) => {
  try {
    if (!req.body) return res.status(400).send("No Email or password provided");
    const result = UserDetailSchema.safeParse(req.body);
    if (!result.success)
      return res
        .status(400)
        .json(
          ErrorMessage("failed", result.error.message, res.locals.requestId),
        );

    const { email, password } = result.data;
    const { data, error } = await SupabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error?.code === "invalid_credentials") {
      return res
        .status(401)
        .send(ErrorMessage(error.code, error.message, res.locals.requestId));
    } else if (error?.code === "email_not_confirmed") {
      return res
        .status(403)
        .send(ErrorMessage(error.code, error.message, res.locals.requestId));
    } else if (error != null) {
      throw new Error(error.message);
    }

    if (!data.user) throw new Error("User Not Found");
    if (!data.session)
      return res.status(200).json({
        message: "Need Confirmation",
        requireConfirmation: true,
      });
    return res
      .status(200)
      .json(
        AuthApiResponse(
          200,
          "User logged in",
          data.user.id,
          data.session.access_token,
          data.session.refresh_token,
          data.session.expires_at,
        ),
      );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(ErrorMessage("500", errorMessage, res.locals.requestId));
    return res
      .status(500)
      .send(
        ErrorMessage(
          "INTERNAL_SERVER_ERROR_SIGNIN",
          "An internal server error occurred in Signing up",
          res.locals.requestId,
        ),
      );
  }
};

export default signInController;
