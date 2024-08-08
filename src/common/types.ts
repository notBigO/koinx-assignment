interface TradeInput {
  userId: number;
  utcTime: Date;
  operation: "Buy" | "Sell";
  market: string;
  baseCoin: string;
  quoteCoin: string;
}
