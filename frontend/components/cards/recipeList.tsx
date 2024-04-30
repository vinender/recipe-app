// components/RecipeList.js
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
