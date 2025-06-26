import express from "express";
import { createServer } from "http";
import colors from "colors";
import { initDB, sql } from "./config/db.js";
import "dotenv/config";
import rateLimiter from "./middleware/rateLimiter.js";
// Import routes
import transactionRoutes from "./routes/transactionRoutes.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(rateLimiter);
app.use("/", (req, res, next) => {
  res.send("Its working");
});
app.use("/api/transactions", transactionRoutes);

const server = createServer(app);

initDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.yellow.bold);
  });
});
