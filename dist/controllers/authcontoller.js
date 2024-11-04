"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.loginController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = require("../services/userService");
const authmiddleware_1 = require("../middleware/authmiddleware");
const connection_1 = __importDefault(require("../db/connection"));
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, userService_1.authenticateUser)(email, password);
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }
        // Check if the user already has an active token
        const checkActiveTokenQuery = 'SELECT active_token FROM users WHERE user_id = ?';
        connection_1.default.query(checkActiveTokenQuery, [user.user_id], (err, results) => {
            var _a;
            if (err) {
                console.error('Database query error:', err);
                res.status(500).json({ message: 'Database error.' });
                return;
            }
            const activeToken = (_a = results[0]) === null || _a === void 0 ? void 0 : _a.active_token;
            if (activeToken) {
                res.status(403).json({ message: 'You are already logged in. Please log out before logging in again.' });
                return;
            }
            // Generate a JWT token
            const token = jsonwebtoken_1.default.sign({ user_id: user.user_id, email: user.email, fname: user.fname, lname: user.lname, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Store the new active token in the database
            const updateTokenQuery = 'UPDATE users SET active_token = ? WHERE user_id = ?';
            connection_1.default.query(updateTokenQuery, [token, user.user_id], (updateErr) => {
                if (updateErr) {
                    console.error('Failed to update token:', updateErr);
                    res.status(500).json({ message: 'Failed to update token.' });
                    return;
                }
                res.status(200).json({ token });
            });
        });
    }
    catch (error) {
        next(error); // Pass errors to error handler
    }
});
exports.loginController = loginController;
const logoutController = (req, res) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(400).json({ message: 'No token provided.' });
        return;
    }
    (0, authmiddleware_1.blacklistToken)(token); // Add the token to the blacklist
    // Clear the active token in the database on logout
    const clearTokenQuery = 'UPDATE users SET active_token = NULL WHERE active_token = ?';
    connection_1.default.query(clearTokenQuery, [token], (err) => {
        if (err) {
            console.error('Failed to clear token:', err);
            res.status(500).json({ message: 'Failed to clear token.' });
            return;
        }
        res.status(200).json({ message: 'Logged out successfully.' });
    });
};
exports.logoutController = logoutController;
