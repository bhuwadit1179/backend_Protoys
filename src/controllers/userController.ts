// src/controllers/userController.ts
import { Request, Response } from 'express';
import { registerUser, changeUserRole, } from '../services/userService';
import { upload } from '../middleware/multerconfig';
import { getUser, getUserById, updateUserProfile, updateUserProfilePicture } from '../db/queries/userQueries';

//Get User 
export const getProfileController = async (req: Request, res: Response) => {
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
};
export const getUserController = async (req: Request, res: Response) => {
    const userIdParam = req.params.user_id;
    const userId = userIdParam ? parseInt(userIdParam, 10) : undefined;

    if (userId) {
        const user = await getUserById(userId);
        res.status(200).json({ user });

    } try {
        const user = await getUser();
        res.status(200).json({ user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }

    };
}

//Register 
export const registerUserController = async (req: Request, res: Response) => {
    try {
        const message = await registerUser(req.body);
        res.status(201).json({ message });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};
//Update User Role
export const updateUserRoleController = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { role } = req.body;

    try {
        const message = await changeUserRole(user_id, role);
        res.status(200).json({ message });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

export const uploadProfilePicture = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id);
    const profilePicture = req.file;

    if (!profilePicture) {
        res.status(400).json({ message: 'No file uploaded.' });
        return
    }

    // Construct the profile picture URL (assuming a base URL for static files)
    const profilePictureUrl = `${req.protocol}://${req.get('host')}/uploads/profile_pictures/${profilePicture.filename}`;

    try {
        await updateUserProfilePicture(userId, profilePictureUrl);
        res.status(200).json({ message: 'Profile picture uploaded successfully.', profilePictureUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update profile picture.' });
    }
};

export const editProfile = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id);
    const { fname, lname, email, role, phone_number, address, city, state, postal_code, country } = req.body;
    try {
        await updateUserProfile(userId, {
            fname,
            lname,
            email,
            role,
            phone_number,
            address,
            city,
            state,
            postal_code,
            country
        });
        res.status(200).json({ message: "Profile updated successfully." });
    } catch (error) {
        console.log("Error updating profile", error);
        res.status(500).json({ message: 'Failed to update profile.' });
    }
};

