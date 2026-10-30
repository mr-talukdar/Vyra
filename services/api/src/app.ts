import express from "express";
import healthRoute from "./routes/health.route.js";
import {
  generic404Handler,
  genericErrorHandler,
} from "./middleware/error.middleware.js";
import { requestIdMiddleware } from "./middleware/requestID.middleware.js";
import { authRoute } from "./routes/auth.route.js";
import authenticateAndGetUser from "./middleware/authentication.middleware.js";

import type { Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(requestIdMiddleware);

app.use(healthRoute);

app.use("/api/auth", authRoute);

app.use(authenticateAndGetUser);

app.get("/me", (req: Request, res: Response) => {
  return res.status(200).send(req.user);
});

//Catch all 404
app.use(generic404Handler);

//Catch all error
app.use(genericErrorHandler);

export default app;
