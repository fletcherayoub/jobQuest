import express from 'express';
import {login, register, logout } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.get('/me', isAuthenticated, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
})

export default router;