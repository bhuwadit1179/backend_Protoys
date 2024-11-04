// src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;

// Generate JWT token
export const generateToken = (userId: number) => {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' }); // expires in 1 hour
};

// Verify JWT token
export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null; // Invalid or expired token
    }
};
