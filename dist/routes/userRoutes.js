"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authcontoller_1 = require("../controllers/authcontoller");
const userController_1 = require("../controllers/userController");
const authmiddleware_1 = require("../middleware/authmiddleware");
const userController_2 = require("../controllers/userController");
const multerconfig_1 = require("../middleware/multerconfig");
const router = express_1.default.Router();
router.post('/login', authcontoller_1.loginController);
router.post('/logout', authmiddleware_1.authMiddleware, authcontoller_1.logoutController); // Logout is protected by authMiddleware
//User Routes
router.get('/user/:user_id?', authmiddleware_1.authMiddleware, userController_1.getUserController);
router.get('/profile', authmiddleware_1.authMiddleware, userController_1.getProfileController); //get profile
router.post('/register', userController_1.registerUserController); //register
router.put('/user/:user_id/role', authmiddleware_1.authMiddleware, userController_1.updateUserRoleController); //update role
router.post('/user/:user_id/profile-picture', authmiddleware_1.authMiddleware, multerconfig_1.upload.single('profile_pictures'), userController_2.uploadProfilePicture); // upload profile picture
router.put('/user/editprofile/:user_id', authmiddleware_1.authMiddleware, userController_1.editProfile); //edit profile
exports.default = router;
