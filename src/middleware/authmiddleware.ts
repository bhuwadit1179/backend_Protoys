import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import connection from '../db/connection';


// Define AuthenticatedRequest to include user data on req
interface AuthenticatedRequest extends Request {
    user?: {
        user_id: number;
    };
}

// Function to add tokens to blacklist
export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
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
        // Token is valid, attach user info to req and proceed to next middleware
        req.user = { user_id: decoded.user_id };
        console.log('User ID:', req.user.user_id);

        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};