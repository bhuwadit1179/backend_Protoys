// src/services/userService.ts
import bcrypt from 'bcryptjs';
import { getUserByEmail, insertUser, updateUserRoleById } from '../db/queries/userQueries';
import { User } from '../db/model/userModel';

export const registerUser = async (userData: User): Promise<string> => {
    const { email, password, ...otherDetails } = userData;

    const existingUser = await getUserByEmail(email);
    if (existingUser) throw new Error('User already exists with this email.');

    const hashedPassword = await bcrypt.hash(password, 10);
    await insertUser({ ...otherDetails, email, password: hashedPassword });

    return 'User registered successfully.';
};

export const changeUserRole = async (userId: string, role: string): Promise<string> => {
    const VALID_ROLES = ['admin', 'company', 'user'];
    if (!VALID_ROLES.includes(role)) {
        throw new Error('Invalid role. Valid roles are: admin, company, user.');
    }

    await updateUserRoleById(userId, role);
    return 'User role updated successfully.';
};

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
    const user = await getUserByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
};

export const getProfile = async () => {
    // Access user ID directly from `req.user`
    const userId = req.user?.user_id;

    if (userId === undefined) {
        res.status(400).json({ message: 'User ID not found in request.' });
        return
    }
    try {
        const user = await getUserById(userId);
        res.status(200).json({ user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
}