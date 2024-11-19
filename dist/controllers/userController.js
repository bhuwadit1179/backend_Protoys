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
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfile = exports.uploadProfilePicture = exports.updateUserRoleController = exports.registerUserController = exports.getUserController = exports.getProfileController = void 0;
const userService_1 = require("../services/userService");
const userQueries_1 = require("../db/queries/userQueries");
//Get User 
const getProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Access user ID directly from `req.user`
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id;
    if (userId === undefined) {
        res.status(400).json({ message: 'User ID not found in request.' });
        return;
    }
    try {
        const user = yield (0, userQueries_1.getUserById)(userId);
        res.status(200).json({ user });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
});
exports.getProfileController = getProfileController;
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdParam = req.params.user_id;
    const userId = userIdParam ? parseInt(userIdParam, 10) : undefined;
    if (userId) {
        const user = yield (0, userQueries_1.getUserById)(userId);
        res.status(200).json({ user });
    }
    try {
        const user = yield (0, userQueries_1.getUser)();
        res.status(200).json({ user });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
    ;
});
exports.getUserController = getUserController;
//Register 
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield (0, userService_1.registerUser)(req.body);
        res.status(201).json({ message });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
});
exports.registerUserController = registerUserController;
//Update User Role
const updateUserRoleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const { role } = req.body;
    try {
        const message = yield (0, userService_1.changeUserRole)(user_id, role);
        res.status(200).json({ message });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
});
exports.updateUserRoleController = updateUserRoleController;
const uploadProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.user_id);
    const profilePicture = req.file;
    if (!profilePicture) {
        res.status(400).json({ message: 'No file uploaded.' });
        return;
    }
    // Construct the profile picture URL (assuming a base URL for static files)
    const profilePictureUrl = `${req.protocol}://${req.get('host')}/uploads/profile_pictures/${profilePicture.filename}`;
    try {
        yield (0, userQueries_1.updateUserProfilePicture)(userId, profilePictureUrl);
        res.status(200).json({ message: 'Profile picture uploaded successfully.', profilePictureUrl });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update profile picture.' });
    }
});
exports.uploadProfilePicture = uploadProfilePicture;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.user_id);
    const { fname, lname, email, role, phone_number, address, city, state, postal_code, country } = req.body;
    console.log("Incoming user ID:", userId);
    console.log("Incoming profile data:", {
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
    try {
        yield (0, userQueries_1.updateUserProfile)(userId, {
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
    }
    catch (error) {
        console.log("Error updating profile", error);
        res.status(500).json({ message: 'Failed to update profile.' });
    }
});
exports.editProfile = editProfile;
