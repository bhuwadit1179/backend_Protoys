"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserprofile = exports.updateUserProfilePicture = exports.updateUserRoleById = exports.insertUser = exports.getUserByEmail = void 0;
// src/db/queries/userQueries.ts
const connection_1 = __importDefault(require("../connection"));
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
const insertUser = (userData) => {
    return new Promise((resolve, reject) => {
        const { fname, lname, email, password, role = "user", citizen_id, phone_number, address_line1, city, state, postal_code, country, company_id } = userData;
        const query = `
            INSERT INTO users (
                fname, lname, email, password, role, citizen_id, phone_number, address_line1,
                city, state, postal_code, country, company_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        connection_1.default.query(query, [
            fname, lname, email, password, role,
            citizen_id || null, phone_number || null, address_line1 || null,
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
const updateUserprofile = (userId, profileData) => {
    return new Promise((resolve, reject) => {
        const query = `
        UPDATE users
        SET fname = ?,lname = ?, email = ?, phone_number = ?, address_line1 = ?, city = ?, state = ?, postal_code = ?, country = ?
        WHERE user_id = ?;
    `;
        const values = [
            profileData.fname,
            profileData.lname,
            profileData.email,
            profileData.phone_number,
            profileData.address_line1,
            profileData.city,
            profileData.state,
            profileData.postal_code,
            profileData.country,
            userId
        ];
        connection_1.default.query(query, values, (err) => {
            if (err) {
                console.log("Database error ", err);
                reject(new Error("Database error, "));
            }
            else {
                resolve();
            }
        });
    });
};
exports.updateUserprofile = updateUserprofile;
