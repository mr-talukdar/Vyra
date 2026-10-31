import { Router } from "express";
import signupController from "../controllers/signup.controller.js";
import signInController from "../controllers/signin.controller.js";
import logoutController from "../controllers/logout.controller.js";
import authenticateAndGetUser from "../middleware/authentication.middleware.js";

const authRoute = Router();

authRoute.post("/sign-up", signupController);
authRoute.post("/sign-in", signInController);
authRoute.post("/sign-out", authenticateAndGetUser, logoutController);
export { authRoute };
