import express, { Request, Response } from "express";

const healthRouter = express.Router();

healthRouter.get("/", (req: Request, res: Response) => {
  return res.sendStatus(200).json({ health: "OK" });
});

export default healthRouter;
