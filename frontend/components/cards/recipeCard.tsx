import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="w-full mx-auto overflow-hidden bg-white text-black shadow-lg rounded-lg">
      <img className="w-full h-56 object-cover object-center" src={recipe.recipe_image} alt={recipe.name} /> {/* Use recipe.recipe_image for the image */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{recipe.name}</h2>
        <p className="mt-2 text-sm text-gray-600">{recipe.category}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
