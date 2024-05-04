import { Request, Response } from 'express';
import Recipe from '../models/Recipe';


export const createRecipe = async (req: Request, res: Response) => {
  try {
    // Extract fields from the request body
    const { name, category, ingredients, instructions, recipe_image, created_by } = req.body;

    // Check if all required fields are present
    if (!name || !category || !ingredients || !instructions || !recipe_image || !created_by) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new recipe object
    const recipe = new Recipe({
      name,
      category,
      ingredients,
      instructions,
      recipe_image,
      created_by,
    });

    // Save the recipe to the database
    const newRecipe = await recipe.save();

    // Return the newly created recipe
    res.status(201).json(newRecipe);
  } catch (error) {
    // Handle errors
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get all recipes
export const getAllRecipes = async (req: Request, res: Response) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single recipe by ID
export const getRecipeById = async (req: Request, res: Response) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (recipe == null) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a recipe by ID
export const  updateRecipe = async (req: Request, res: Response) => {
    try {
        const { name, category, ingredients, instructions, image } = req.body;
        const recipe = await Recipe.findById(req.params.id);
        if (recipe == null) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        recipe.name = name;
        recipe.category = category;
        recipe.ingredients = ingredients;
        recipe.instructions = instructions;
        recipe.recipe_image = image;
        const updatedRecipe = await recipe.save();
        res.json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a recipe by ID
export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    await recipe.deleteOne(); // Use deleteOne() instead of remove()

    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
