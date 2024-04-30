import express from 'express';
import * as recipeController from '../controllers/recipeController';
import { authenticate } from '../middleware';

const router = express.Router();

// Create a new recipe
router.post('/recipe', authenticate, recipeController.createRecipe);

// Add other routes for getting, updating, and deleting recipes as needed

export default router;
