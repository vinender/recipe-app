import express from 'express';
import * as authController from '../controllers/authController';

const router = express.Router();

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

export default router;