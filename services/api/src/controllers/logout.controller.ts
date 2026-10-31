import type { Request, Response } from "express";
import SupabaseClient from "../supabase/SupabaseClient.js";
import { ErrorMessage } from "../lib/utils.js";

const logoutController = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.accessToken)
      return res.status(401).send("User Session not found");
    const { error } = await SupabaseClient.auth.admin.signOut(
      req.accessToken,
      "local",
    );
    if (error) return res.status(400).send("error logging out");
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(ErrorMessage("500", errorMessage, res.locals.requestId));
    return res
      .status(500)
      .send(
        ErrorMessage(
          "INTERNAL_SERVER_ERROR_SIGNOUT",
          "An internal server error occurred in Signing out",
          res.locals.requestId,
        ),
      );
  }
};

export default logoutController;
