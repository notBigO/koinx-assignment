import csv from "csv-parser";
import fs from "fs";

export const parseCSV = async (filePath: string): Promise<TradeInput[]> => {
  const data: TradeInput[] = [];
  return new Promise<TradeInput[]>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const trade: TradeInput = {
          userId: row.User_ID,
          utcTime: new Date(row.UTC_Time),
          operation: row.Operation as "Buy" | "Sell",
          market: row.Market,
          baseCoin: row["Buy/Sell Amount"],
          quoteCoin: row.Price,
        };
        data.push(trade);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
