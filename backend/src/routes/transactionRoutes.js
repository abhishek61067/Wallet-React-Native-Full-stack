import express from "express";
import { sql } from "../config/db.js";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  transactionSummary,
} from "../controllers/transactionControllers.js";

const router = express.Router();

// get all transactions for a user
router.get("/:userId", getTransactions);

// create a new transaction
router.post("/", createTransaction);

// delete transaction
router.delete("/:id", deleteTransaction);

// transaction summary
router.get("/summary/:userId", transactionSummary);

export default router;
