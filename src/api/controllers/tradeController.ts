import { parseCSV } from "@/utils/csvParser";
import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import { db } from "@/common/db";

const upload = multer({ dest: "uploads/" });

export const uploadCSV = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const data: TradeInput[] = await parseCSV(file.path);

    const dbData = data.map((trade) => ({
      userId: trade.userId,
      utcTime: trade.utcTime,
      operation: trade.operation,
      market: trade.market,
      baseCoin: trade.baseCoin,
      quoteCoin: trade.quoteCoin,
    }));

    const createdTrades = await db.trade.createMany({
      data: dbData,
    });

    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return res.status(200).json({ data });
  } catch (error) {
    if (file && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return res.status(500).json({ error: "Error processing CSV file" });
  }
};

export const getBalance = async (req: Request, res: Response) => {
  const { timestamp } = req.body;

  if (timestamp === undefined) {
    return res.sendStatus(400).json({ error: "Missing timestamp" });
  }

  try {
    const date = new Date(timestamp);

    const trades = await db.trade.findMany({
      where: {
        utcTime: {
          lt: date,
        },
      },
    });

    const balances: Record<string, number> = {};
    trades.forEach((trade) => {
      const [baseCoin, quoteCoin] = trade.market.split("/");

      if (!balances[baseCoin]) {
        balances[baseCoin] = 0;
      }

      if (trade.operation === "Buy") {
        balances[baseCoin] += parseInt(trade.baseCoin);
      } else if (trade.operation === "Sell") {
        balances[baseCoin] -= parseInt(trade.baseCoin);
      }
    });

    return res.json({ balances });
  } catch (error) {}
};
