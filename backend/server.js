import express from "express";
import { createServer } from "http";
import colors from "colors";
import "dotenv/config"; // this loads .env automatically
import { sql } from "./config/db.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
const server = createServer(app);

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
    console.log("Database initialized successfully".green);
  } catch (error) {
    console.error("Error initializing database:", error.message.red);
    process.exit(1);
  }
}

app.get("/api/transactions/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactions =
      await sql`SELECT * FROM transactions WHERE user_id = ${userId}`;
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error.message.red);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    // title,amount,category,userId
    const { title, amount, category, userId } = req.body;
    if (!title || !category || !userId || amount === "undefined") {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction =
      await sql`INSERT INTO transactions (title, amount, category, user_id) VALUES (${title}, ${amount}, ${category}, ${userId}) RETURNING *`;

    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log(error.message.red);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

initDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.yellow.bold);
  });
});
