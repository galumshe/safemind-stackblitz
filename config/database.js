import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12ABcd..',
  database: process.env.DB_NAME || 'node_crud',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});