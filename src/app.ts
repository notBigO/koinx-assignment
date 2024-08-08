import express, { Request, Response, type Express } from "express";
import router from "./api/routes/tradeRoute";
import healthRouter from "./api/routes/healthRoute";

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api", router);
app.use("/", healthRouter);

// Server
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
