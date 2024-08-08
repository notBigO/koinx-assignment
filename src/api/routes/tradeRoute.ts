import express from "express";
import multer from "multer";
import { getBalance, uploadCSV } from "../controllers/tradeController";
import { isCSV } from "../middlewares/isCSV";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", isCSV, uploadCSV);
router.post("/balance", getBalance);

export default router;
