import type { Request, Response } from "express";

const db = { isUp: false };

const liveController = (req: Request, res: Response) => {
  res.status(200).send("Health check passed");
};

const readyController = (req: Request, res: Response) => {
  try {
    if (!db.isUp) {
      return res.status(503).send({
        status: "not_ready",
        checks: {
          database: "unavailable",
        },
      });
    }

    return res.status(200).send({
      status: "ready",
      checks: {
        database: "available",
      },
    });
  } catch (ERR) {
    console.log(ERR);
    return res.status(503).send("An internal server error occurred");
  }
};
export { liveController, readyController };
