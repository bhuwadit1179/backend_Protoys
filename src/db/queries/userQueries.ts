// src/db/queries/userQueries.ts
import connection from '../connection';
import { User } from '../model/userModel';

export const getUserByEmail = (email: string): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [email], (error, results) => {
            if (error) return reject(error);
            resolve(results[0] || null);
        });
    });
};

export const insertUser = (userData: User): Promise<void> => {
    return new Promise((resolve, reject) => {
        const {
            fname,
            lname,
            email,
            password,
            role = "user",
            citizen_id,
            phone_number,
            address_line1,
            city,
            state,
            postal_code,
            country,
            company_id
        } = userData;

        const query = `
            INSERT INTO users (
                fname, lname, email, password, role, citizen_id, phone_number, address_line1,
                city, state, postal_code, country, company_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(query, [
            fname, lname, email, password, role,
            citizen_id || null, phone_number || null, address_line1 || null,
            city || null, state || null, postal_code || null,
            country || null, company_id || null
        ], (error) => {
            if (error) return reject(error);
            resolve();
        });
    });
};


export const updateUserRoleById = (userId: string, role: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE users SET role = ? WHERE user_id = ?`;
        connection.query(query, [role, userId], (error) => {
            if (error) return reject(error);
            resolve();
        });
    });
};

export const updateUserProfilePicture = (userId: number, profilePictureUrl: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET profile_picture_url = ? WHERE user_id = ?';
        connection.query(query, [profilePictureUrl, userId], (err) => {
            if (err) {
                console.error('Failed to update profile picture URL:', err);
                reject(new Error('Database error.'));
            } else {
                resolve();
            }
        });
    });
};

export const updateUserprofile = (userId: number, profileData: any): Promise<void> => {
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
        ]
        connection.query(query, values, (err) => {
            if (err) {
                console.log("Database error ", err);
                reject(new Error("Database error, "))
            }
            else {
                resolve()
            }
        })
    })
}