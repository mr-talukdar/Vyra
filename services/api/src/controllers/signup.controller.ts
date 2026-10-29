import type { Request, Response } from "express";
import SupabaseClient from "../supabase/SupabaseClient.js";
import { SignupDetailSchema } from "../zod/auth.schema.js";

import { ErrorMessage } from "../types/error.type.js";

const signupController = async (req: Request, res: Response) => {
  try {
    if (!req.body) return res.status(400).send("NO email or password provided");
    if (!req.body.email || !req.body.password)
      return res.status(400).send("NO email or password provided");
    const result = SignupDetailSchema.safeParse({
      email: req.body.email,
      password: req.body.password,
    });
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error,
      });
    }

    const { email, password } = result.data;
    const { data, error } = await SupabaseClient.auth.signUp({
      email,
      password,
    });

    if (
      error?.code === "email_exists" ||
      error?.code === "user_already_exists"
    ) {
      return res.status(409).send("User Already Exists");
    } else if (error?.code === "weak_password") {
      return res.status(400).send("Weak Password");
    } else if (error != null) throw new Error(error.message);
    if (!data.user) throw new Error("Problem in creating user");
    if (!data.session)
      return res.status(200).json({
        message: "Need Confirmation",
        requireConfirmation: true,
      });
    return res.status(201).json({
      status: 201,
      message: "User has been created",
      id: data.user.id,
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(ErrorMessage("500", errorMessage, res.locals.requestId));
    return res
      .status(500)
      .send(
        ErrorMessage(
          "INTERNAL_SERVER_ERROR_SIGNUP",
          "An internal server error occurred in Signing up",
          res.locals.requestId,
        ),
      );
  }
};

export default signupController;
