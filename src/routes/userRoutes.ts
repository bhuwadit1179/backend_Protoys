import express from 'express';
import { loginController, logoutController } from '../controllers/authcontoller';
import { registerUserController, updateUserRoleController, editProfile, getUserController, getProfileController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authmiddleware';
import { uploadProfilePicture } from '../controllers/userController';
import { upload } from '../middleware/multerconfig';

const router = express.Router();

router.post('/login', loginController);
router.post('/logout', authMiddleware, logoutController); // Logout is protected by authMiddleware

//User Routes
router.get('/user/:user_id?', authMiddleware, getUserController)
router.get('/profile', authMiddleware, getProfileController); //get profile
router.post('/register', registerUserController); //register
router.put('/user/:user_id/role', authMiddleware, updateUserRoleController); //update role
router.post('/user/:user_id/profile-picture', authMiddleware, upload.single('profile_pictures'), uploadProfilePicture); // upload profile picture
router.put('/user/editprofile/:user_id', authMiddleware, editProfile); //edit profile


export default router;
