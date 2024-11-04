import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateUser } from '../services/userService';
import { blacklistToken } from '../middleware/authmiddleware';
import connection from '../db/connection';

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }

        // Check if the user already has an active token
        const checkActiveTokenQuery = 'SELECT active_token FROM users WHERE user_id = ?';
        connection.query(checkActiveTokenQuery, [user.user_id], (err, results: any[]) => {
            if (err) {
                console.error('Database query error:', err);
                res.status(500).json({ message: 'Database error.' });
                return;
            }

            const activeToken = results[0]?.active_token;
            if (activeToken) {
                res.status(403).json({ message: 'You are already logged in. Please log out before logging in again.' });
                return;
            }

            // Generate a JWT token
            const token = jwt.sign(
                { user_id: user.user_id, email: user.email, fname: user.fname, lname: user.lname, role: user.role },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            // Store the new active token in the database
            const updateTokenQuery = 'UPDATE users SET active_token = ? WHERE user_id = ?';
            connection.query(updateTokenQuery, [token, user.user_id], (updateErr) => {
                if (updateErr) {
                    console.error('Failed to update token:', updateErr);
                    res.status(500).json({ message: 'Failed to update token.' });
                    return;
                }
                res.status(200).json({ token });
            });
        });
    } catch (error) {
        next(error); // Pass errors to error handler
    }
};

export const logoutController = (req: Request, res: Response): void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(400).json({ message: 'No token provided.' });
        return;
    }

    blacklistToken(token); // Add the token to the blacklist

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
