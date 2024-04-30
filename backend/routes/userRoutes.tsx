import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

 router.get('/current-user', userController.getCurrentUser);

  
export default router;