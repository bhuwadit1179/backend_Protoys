"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.blacklistToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = __importDefault(require("../db/connection"));
// In-memory blacklist set to store blacklisted tokens
const tokenBlacklist = new Set();
// Function to add tokens to blacklist
const blacklistToken = (token) => {
    tokenBlacklist.add(token);
};
exports.blacklistToken = blacklistToken;
// authMiddleware with blacklist check
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
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
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // Query the user's active token from the database
        const query = 'SELECT active_token FROM users WHERE user_id = ?';
        connection_1.default.query(query, [decoded.user_id], (err, results) => {
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
    }
    catch (error) {
        console.error('JWT verification error:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};
exports.authMiddleware = authMiddleware;
