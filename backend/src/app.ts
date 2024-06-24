import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { initDb } from "./db/db";
import productRoutes from "./routes/products";
import authRoutes from "./routes/auth";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/products", productRoutes);
app.use("/", authRoutes);

initDb(async () => {
  const port = process.env.PORT || 3100;
  console.log(`Server started on port ${port}`);
  await app.listen(port);
});
