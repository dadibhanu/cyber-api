import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

/* Main Application DB */
export const main_pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

/* Cyber Training DB */
export const cyber_pool = mysql.createPool({
  host: process.env.CYBER_DB_HOST,
  user: process.env.CYBER_DB_USER,
  password: process.env.CYBER_DB_PASSWORD,
  database: process.env.CYBER_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});