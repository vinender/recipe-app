// components/RecipeDetails.js
const RecipeDetails = ({ recipe }) => {
    return (
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        <img className="w-full h-64 object-cover object-center" src={recipe.image} alt={recipe.name} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold">{recipe.name}</h2>
          <p className="mt-2 text-gray-600">Category: {recipe.category}</p>
          <p className="mt-4">{recipe.ingredients}</p>
          <p className="mt-4">{recipe.instructions}</p>
        </div>
      </div>
    );
  };
  
  export default RecipeDetails;
  