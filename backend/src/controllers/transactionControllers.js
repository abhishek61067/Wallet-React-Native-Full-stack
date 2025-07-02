import { sql } from "../config/db.js";

const getTransactions = async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactions =
      await sql`SELECT * FROM transactions WHERE user_id = ${userId}`;
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error.message.red);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createTransaction = async (req, res) => {
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
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    // if id is other than integer
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid transaction id" });
    }

    const transaction =
      await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;

    if (transaction.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction[0]);
  } catch (error) {
    console.log(error.message.red);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const transactionSummary = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Fetch all transactions for the user
    const transactions =
      await sql`SELECT amount, category FROM transactions WHERE user_id = ${userId}`;

    // Calculate totals
    let income = 0;
    let expenses = 0;

    transactions.forEach((tx) => {
      // You can adjust this logic if you have a specific way to identify income vs expense
      if (tx.amount >= 0) {
        income += Number(tx.amount);
      } else {
        expenses += Number(tx.amount); // expenses will be negative
      }
    });

    const balance = income + expenses; // since expenses are negative

    res.status(200).json({
      income,
      expenses,
      balance,
    });
  } catch (error) {
    console.log(error.message.red);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getTransactions,
  createTransaction,
  deleteTransaction,
  transactionSummary,
};
