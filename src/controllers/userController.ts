// src/controllers/userController.ts
import { Request, Response } from 'express';
import { registerUser, changeUserRole, } from '../services/userService';
import { upload } from '../middleware/multerconfig';
import { updateUserprofile, updateUserProfilePicture } from '../db/queries/userQueries';

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
    const { fname, lname, email, phone_number, address_line1, city, state, postal_code, country } = req.body;
    try {
        await updateUserprofile(userId, {
            fname,
            lname,
            email,
            phone_number,
            address_line1,
            city,
            state,
            postal_code,
            country
        });
        res.status(200).json({ message: "Profile updated successfully." });
    }
    catch (error) {
        console.log("Error updating profile", error);
        res.status(500).json({ message: 'Failed to update profile.' });
    }


}
