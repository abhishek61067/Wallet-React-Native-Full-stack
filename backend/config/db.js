import { neon } from "@neondatabase/serverless";
import "dotenv/config"; // this loads .env automatically

console.log("database url: ", process.env.DATABASE_URL);
// create sql connection using database url
export const sql = neon(process.env.DATABASE_URL);
