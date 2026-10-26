import type { Request, Response } from "express";

interface db {
  name: string;
  ready: boolean;
}

const checkDb = (dbName: string, signal: AbortSignal): Promise<db> => {
  return new Promise<db>((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout>;

    if (signal.aborted) {
      reject(new Error("Operation was cancelled, timedout"));
      return;
    }

    const onAbort = () => {
      clearTimeout(timer);
      signal.removeEventListener("abort", onAbort);
      reject(new Error("Operation was cancelled, timedout"));
    };

    timer = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve({ name: dbName, ready: true });
    }, 1000);

    signal.addEventListener("abort", onAbort);
  });
};

const liveController = (req: Request, res: Response) => {
  res.status(200).send("Health check passed");
};

const readyController = async (req: Request, res: Response) => {
  let timeOutId: ReturnType<typeof setTimeout> | undefined;
  try {
    const abortController = new AbortController();
    const response = checkDb("VYRA", abortController.signal);

    const Timeout = new Promise<never>((_, reject) => {
      timeOutId = setTimeout(() => {
        reject(new Error("The operation timed out"));
        abortController.abort();
      }, 2000);
    });
    const result = await Promise.race([Timeout, response]);

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(503).send("The opeartion was timedout");
  } finally {
    if (timeOutId !== undefined) {
      clearTimeout(timeOutId);
    }
  }
};

export { liveController, readyController };
