import { neon, neonConfig } from "@neondatabase/serverless";
import dotenv from "dotenv";
import fetch from "cross-fetch";

dotenv.config();

// 🔥 Set fetch manually for serverless Neon
neonConfig.fetch = fetch;

console.log("database url: ", process.env.DATABASE_URL);

export const sql = neon(process.env.DATABASE_URL);
