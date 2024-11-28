// src/db/queries/userQueries.ts
import connection from '../connection';
import { User } from '../model/userModel';
import { format } from 'date-fns';

export const getUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users';
        connection.query(query, (error, results) => {
            if (error) return reject(error);
            resolve(results || null);
        });
    });
};

export const getUserByEmail = (email: string): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [email], (error, results) => {
            if (error) return reject(error);
            resolve(results[0] || null);
        });
    });
};
export const getUserById = (user_id: number): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE user_id = ?';
        connection.query(query, [user_id], (error, results) => {
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
            address,
            city,
            state,
            postal_code,
            country,
            company_id
        } = userData;

        const query = `
            INSERT INTO users (
                fname, lname, email, password, role, citizen_id, phone_number, address,
                city, state, postal_code, country, company_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(query, [
            fname, lname, email, password, role,
            citizen_id || null, phone_number || null, address || null,
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


export const updateUserProfile = (userId: number, profileData: any): Promise<void> => {
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
        const formattedDate = format(now, 'yyyy-MM-dd HH:mm:ss'); // Use date-fns to format as MySQL DATETIME

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

        connection.query(query, values, (err) => {
            if (err) {
                console.log("Database error", err);
                reject(new Error("Database error"));
            } else {
                resolve();
            }
        });
    });
};


export const deleteUserById = (userId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE user_id = ?';
        connection.query(query, [userId], (error) => {
            if (error) return reject(error);
            resolve();
        });
    });
}