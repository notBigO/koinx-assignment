import express from "express";
import multer from "multer";
import { getBalance, uploadCSV } from "../controllers/tradeController";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadCSV);
router.post("/balance", getBalance);

export default router;
