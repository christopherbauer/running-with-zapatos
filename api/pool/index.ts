import dotenv from "dotenv";
import pg from "pg";
dotenv.config();
console.log({ url: process.env.DATABASE_URL });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
pool.on("error", (err) => console.error(err));

export default pool;
