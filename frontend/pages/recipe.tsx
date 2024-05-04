import React, { useEffect, useState } from 'react';
import http from '../utils/api/http';
import Navbar from '../components/navbar/navbar';
import RecipeCard from '../components/cards/recipeCard';
import { useRouter } from 'next/router';
 
export default function Recipe() {
  const [recipes, setRecipes] = useState([]);
   const router = useRouter();

   
  useEffect(() => {
    // Function to fetch all recipes
    const fetchRecipes = async () => {
      try {
        const response = await http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/recipe`);
        // Assuming the response data is an array of recipes
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    // Call the fetchRecipes function when the component mounts
    fetchRecipes();
  }, []); // Empty dependency array to only run this effect once when the component mounts

  return (
    <div className='flex flex-col justify-center items-center bg-black h-screen'>
    <Navbar/>
    <span onClick={() => router.push('/create-recipe')} className='bg-red-700 rounded-lg text-white font-semibold mt-2 w-36 p-1 px-3 border'>Add Recipe</span>
    <div className='flex flex-col items-center justify-center w-full max-w-screen-lg mt-6'>
      {/* Check if recipes exist */}
      {Object.values(recipes).length > 0 ? (
        // Display the recipes
        <div className='grid grid-cols-4 gap-4'>
          {Object.values(recipes).map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} /> // Pass each recipe as props
          ))}
        </div>
      ) : (
        // Show message if there are no recipes
        <div className="flex flex-col items-center justify-center text-white">
          <p>No recipes available.</p>
          <button onClick={() => router.push('/create-recipe')} className='bg-red-700 rounded-lg text-white font-semibold mt-2 w-36 p-1 px-3 border'>Create New Recipe</button>
        </div>
      )}
    </div>
  </div>
  
  );
}
