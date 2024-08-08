import express, { Request, Response, type Express } from "express";
import router from "./api/routes/tradeRoute";
import healthRouter from "./api/routes/healthRoute";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);
app.use("/", healthRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
