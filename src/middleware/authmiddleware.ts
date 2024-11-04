import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import connection from '../db/connection';


// Define AuthenticatedRequest to include user data on req
interface AuthenticatedRequest extends Request {
    user?: {
        user_id: number;
    };
}

// In-memory blacklist set to store blacklisted tokens
const tokenBlacklist: Set<string> = new Set();

// Function to add tokens to blacklist
export const blacklistToken = (token: string): void => {
    tokenBlacklist.add(token);
};

// authMiddleware with blacklist check
export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    // Check if the token is blacklisted
    if (tokenBlacklist.has(token)) {
        res.status(401).json({ message: 'Token has been revoked. Please log in again.' });
        return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error('JWT_SECRET is not defined in environment variables.');
        res.status(500).json({ message: 'Internal server error.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload & { user_id: number };

        // Query the user's active token from the database
        const query = 'SELECT active_token FROM users WHERE user_id = ?';
        connection.query(query, [decoded.user_id], (err, results: any[]) => {
            if (err) {
                console.error('Database query error:', err);
                res.status(500).json({ message: 'Database error.' });
                return;
            }

            if (!results.length || results[0].active_token !== token) {
                res.status(401).json({ message: 'Invalid or expired token.' });
                return;
            }

            // Token is valid, attach user info to req and proceed to next middleware
            req.user = { user_id: decoded.user_id };
            next();
        });
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

