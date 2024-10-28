// src/db/connection.ts
import mysql from 'mysql';

// Create a connection to the database
const db = mysql.createConnection({
    host: '127.0.0.1',  // Use 'localhost' for local database
    port: 3306,         // MySQL default port
    user: 'root',       // MySQL root user
    password: '',       // Your MySQL root password (if any)
    database: 'laravel' // The name of your database
});

// Connect to the database
db.connect((err: mysql.MysqlError | null) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', db.threadId);
});

// Export the db for use in other files
export default db;
