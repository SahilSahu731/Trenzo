import express from 'express';
import { getUser, getUserById, loginUser, logoutUser, registerUser, updateUserProfile } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// protect routes can be added here 
// user's own profile
router.get('/profile', protect, getUser);

// any user ID
router.get('/user/:id', protect, getUserById);
router.put('/profile/edit', protect, updateUserProfile);

export default router;