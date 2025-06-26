import { neon } from "@neondatabase/serverless";
import "dotenv/config";

console.log("database url: ", process.env.DATABASE_URL);

let sql;
try {
  sql = neon(process.env.DATABASE_URL);
} catch (error) {
  console.error("Neon connection error:", error);
}

export async function initDB() {
  try {
    console.log("Initializing database...".blue);
    console.log(sql, "sql".yellow);
    // await sql`SELECT 1`;
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
    console.error("Error initializing database:", error);
  }
}

export { sql };
