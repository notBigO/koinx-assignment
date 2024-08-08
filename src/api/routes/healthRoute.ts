import express, { Request, Response } from "express";

const healthRouter = express.Router();

healthRouter.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ health: "OK" });
});

export default healthRouter;
