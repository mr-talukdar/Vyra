import { Router } from "express";
import {
  liveController,
  readyController,
} from "../controllers/health.controller.js";

const healthRoute = Router();

healthRoute.get("/health/live", liveController);
healthRoute.get("/health/ready", readyController);

export default healthRoute;
