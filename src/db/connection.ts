// src/db/connection.ts
import mysql from 'mysql';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), // Convert to number
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

export default db;
