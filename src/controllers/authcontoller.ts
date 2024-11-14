import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateUser } from '../services/userService';
import connection from '../db/connection';

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }

        // Generate a JWT token
        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        // Send the token in the response
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login. Please try again later.' });
    }
};

export const logoutController = (req: Request, res: Response): void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(400).json({ message: 'No token provided.' });
        return;
    }

    // Clear the active token in the database on logout
    const clearTokenQuery = 'UPDATE users SET active_token = NULL WHERE active_token = ?';
    connection.query(clearTokenQuery, [token], (err) => {
        if (err) {
            console.error('Failed to clear token:', err);
            res.status(500).json({ message: 'Failed to clear token.' });
            return;
        }
        res.status(200).json({ message: 'Logged out successfully.' });
    });
};
