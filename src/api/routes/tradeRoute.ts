import express from "express";

import { getBalance, uploadCSV } from "../controllers/tradeController";
import { isCSV } from "../middlewares/isCSV";

const router = express.Router();

router.post("/upload", isCSV, uploadCSV);
router.post("/balance", getBalance);

export default router;
