import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";

const upload = multer({ dest: "uploads/" });

export const isCSV = (req: Request, res: Response, next: NextFunction) => {
  // check for upload existence
  upload.single("file")(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ error: "File upload error" });
    }

    // check for invalid file type or non existent file
    if (
      !req.file ||
      path.extname(req.file.originalname).toLowerCase() !== ".csv"
    ) {
      return res
        .status(400)
        .json({ error: "File not found or invalid file format (.csv only)" });
    }

    next();
  });
};
