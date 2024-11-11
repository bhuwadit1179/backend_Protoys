// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import path from 'path';
import cors from 'cors';
const corsOptions = {
    origin: 'http://localhost:3001', // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow Content-Type header
};


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
