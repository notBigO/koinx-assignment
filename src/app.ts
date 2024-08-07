import express, { type Express } from "express";

const app: Express = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
