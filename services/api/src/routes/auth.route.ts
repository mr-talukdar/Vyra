import { Router } from "express";
import signupController from "../controllers/signup.controller.js";
import signInController from "../controllers/signin.controller.js";

const authRoute = Router();

authRoute.post("/sign-up", signupController);
authRoute.post("/sign-in", signInController);

export { authRoute };
