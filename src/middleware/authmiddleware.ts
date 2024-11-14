import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

// Define AuthenticatedRequest to include user data on req
interface AuthenticatedRequest extends Request {
    user?: {
        user_id: number;
        role?: string;  // Add role if you plan to enforce role-based access
    };
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    const secret = process.env.JWT_SECRET!;
    if (!secret) {
        console.error('JWT_SECRET is not defined in environment variables.');
        res.status(500).json({ message: 'Internal server error.' });
        return;
    }

    try {
        // Decode and verify token
        const decoded = jwt.verify(token, secret) as JwtPayload & { user_id: number; role: string };

        // Attach user data to req for further processing
        req.user = { user_id: decoded.user_id, role: decoded.role };

        console.log(`Authenticated user ID: ${req.user.user_id}, Role: ${req.user.role}`);

        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.status(401).json({ message: 'Session expired. Please log in again.' });
        } else if (error instanceof JsonWebTokenError) {
            res.status(400).json({ message: 'Invalid token.' });
        } else {
            console.error('Unexpected JWT verification error:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    }
};
