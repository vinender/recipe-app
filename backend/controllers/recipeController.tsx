import { Request, Response } from 'express';
import Recipe from '../models/Recipe';
 
export const createRecipe = async (req: Request, res: Response) => {
  try {
    // Extract data from request body
    const { name, category, ingredients, instructions, image } = req.body;
    // Assuming you have middleware to extract user from request
    const createdBy = 'req.user';

    // Create a new recipe
    const recipe = new Recipe({
      name,
      category,
      ingredients,
      instructions,
      image,
      createdBy
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


// // Get all recipes
// export const getAllRecipes = async (req: any, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
//     try {
//         const recipes = await Recipe.find();
//         res.json(recipes);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Get a single recipe by ID
// export const getRecipeById = async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: any; }): void; new(): any; }; }; json: (arg0: any) => void; }) => {
//     try {
//         const recipe = await Recipe.findById(req.params.id);
//         if (recipe == null) {
//             return res.status(404).json({ message: 'Recipe not found' });
//         }
//         res.json(recipe);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Update a recipe by ID
// export const  updateRecipe = async (req: { body: { name: any; category: any; ingredients: any; instructions: any; image: any; }; params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: any; }): void; new(): any; }; }; json: (arg0: any) => void; }) => {
//     try {
//         const { name, category, ingredients, instructions, image } = req.body;
//         const recipe = await Recipe.findById(req.params.id);
//         if (recipe == null) {
//             return res.status(404).json({ message: 'Recipe not found' });
//         }
//         recipe.name = name;
//         recipe.category = category;
//         recipe.ingredients = ingredients;
//         recipe.instructions = instructions;
//         recipe.image = image;
//         const updatedRecipe = await recipe.save();
//         res.json(updatedRecipe);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Delete a recipe by ID
// export const  deleteRecipe = async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: any; }): void; new(): any; }; }; json: (arg0: { message: string; }) => void; }) => {
//     try {
//         const recipe = await Recipe.findById(req.params.id);
//         if (recipe == null) {
//             return res.status(404).json({ message: 'Recipe not found' });
//         }
//         await recipe.remove();
//         res.json({ message: 'Recipe deleted' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
