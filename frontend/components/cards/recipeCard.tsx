// components/RecipeCard.js
const RecipeCard = ({ recipe }) => {
  return (
    <div className="max-w-md mx-auto overflow-hidden bg-white shadow-lg rounded-lg">
      <img className="w-full h-56 object-cover object-center" src={recipe.image} alt={recipe.name} />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{recipe.name}</h2>
        <p className="mt-2 text-sm text-gray-600">{recipe.category}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
