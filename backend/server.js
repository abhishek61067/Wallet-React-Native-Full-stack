import express from "express";
import { createServer } from "http";
import colors from "colors";
import { initDB, sql } from "./src/config/db.js";
import "dotenv/config";
import rateLimiter from "./src/middleware/rateLimiter.js";
// Import routes
import transactionRoutes from "./src/routes/transactionRoutes.js";
import job from "./src/config/cron.js";

const PORT = process.env.PORT || 5000;

const app = express();

if (process.env.NODE_ENV === "production") job.start(); // Start the cron job if in production

app.use(express.json());
app.use(rateLimiter);

app.use("/api/health", (req, res, next) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/api/transactions", transactionRoutes);
app.use("/", (req, res, next) => {
  res.send("Its working");
});

const server = createServer(app);

initDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.yellow.bold);
  });
});
