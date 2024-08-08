import express from "express";
import multer from "multer";
import { uploadCSV } from "../controllers/tradeController";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadCSV);

export default router;
