import { neon, neonConfig } from "@neondatabase/serverless";
import "dotenv/config";

console.log("database url: ", process.env.DATABASE_URL);

export const sql = neon(process.env.DATABASE_URL);
