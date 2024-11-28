"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserProfile = exports.updateUserProfilePicture = exports.updateUserRoleById = exports.insertUser = exports.getUserById = exports.getUserByEmail = exports.getUser = void 0;
// src/db/queries/userQueries.ts
const connection_1 = __importDefault(require("../connection"));
const date_fns_1 = require("date-fns");
const getUser = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users';
        connection_1.default.query(query, (error, results) => {
            if (error)
                return reject(error);
            resolve(results || null);
        });
    });
};
exports.getUser = getUser;
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        connection_1.default.query(query, [email], (error, results) => {
            if (error)
                return reject(error);
            resolve(results[0] || null);
        });
    });
};
exports.getUserByEmail = getUserByEmail;
const getUserById = (user_id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE user_id = ?';
        connection_1.default.query(query, [user_id], (error, results) => {
            if (error)
                return reject(error);
            resolve(results[0] || null);
        });
    });
};
exports.getUserById = getUserById;
const insertUser = (userData) => {
    return new Promise((resolve, reject) => {
        const { fname, lname, email, password, role = "user", citizen_id, phone_number, address, city, state, postal_code, country, company_id } = userData;
        const query = `
            INSERT INTO users (
                fname, lname, email, password, role, citizen_id, phone_number, address,
                city, state, postal_code, country, company_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        connection_1.default.query(query, [
            fname, lname, email, password, role,
            citizen_id || null, phone_number || null, address || null,
            city || null, state || null, postal_code || null,
            country || null, company_id || null
        ], (error) => {
            if (error)
                return reject(error);
            resolve();
        });
    });
};
exports.insertUser = insertUser;
const updateUserRoleById = (userId, role) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE users SET role = ? WHERE user_id = ?`;
        connection_1.default.query(query, [role, userId], (error) => {
            if (error)
                return reject(error);
            resolve();
        });
    });
};
exports.updateUserRoleById = updateUserRoleById;
const updateUserProfilePicture = (userId, profilePictureUrl) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET profile_picture_url = ? WHERE user_id = ?';
        connection_1.default.query(query, [profilePictureUrl, userId], (err) => {
            if (err) {
                console.error('Failed to update profile picture URL:', err);
                reject(new Error('Database error.'));
            }
            else {
                resolve();
            }
        });
    });
};
exports.updateUserProfilePicture = updateUserProfilePicture;
const updateUserProfile = (userId, profileData) => {
    return new Promise((resolve, reject) => {
        const query = `
        UPDATE users
        SET fname = ?, 
            lname = ?, 
            email = ?, 
            role = ?, 
            phone_number = ?, 
            address = ?, 
            city = ?, 
            state = ?, 
            postal_code = ?, 
            country = ?, 
            company_id = ?, 
            updated_at = ?
        WHERE user_id = ?;
    `;
        // Format current date for MySQL DATETIME field
        const now = new Date();
        const formattedDate = (0, date_fns_1.format)(now, 'yyyy-MM-dd HH:mm:ss'); // Use date-fns to format as MySQL DATETIME
        const values = [
            profileData.fname || null,
            profileData.lname || null,
            profileData.email || null,
            profileData.role || null,
            profileData.phone_number || null,
            profileData.address || null,
            profileData.city || null,
            profileData.state || null,
            profileData.postal_code || null,
            profileData.country || null,
            profileData.company_id || null,
            formattedDate, // Properly formatted timestamp for `updated_at`
            userId
        ];
        connection_1.default.query(query, values, (err) => {
            if (err) {
                console.log("Database error", err);
                reject(new Error("Database error"));
            }
            else {
                resolve();
            }
        });
    });
};
exports.updateUserProfile = updateUserProfile;
const deleteUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE user_id = ?';
        connection_1.default.query(query, [userId], (error) => {
            if (error)
                return reject(error);
            resolve();
        });
    });
};
exports.deleteUserById = deleteUserById;
