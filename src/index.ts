// src/index.ts
import express from 'express';
import route from './route/route';
import './db/connection'; // Ensure the database connection is established

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', route); // Use a base URL for your API

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
