import React, { useEffect, useState } from 'react';
import http from '../utils/api/http';
import Navbar from '../components/navbar/navbar';
import RecipeCard from '../components/cards/recipeCard';
import { useRouter } from 'next/router';
 
export default function Recipe() {
  const [recipes, setRecipes] = useState([]);
   const router = useRouter()
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
    <div className='flex flex-col bg-black'> 
    <Navbar/>
    <span onClick={()=>router.push('/create-recipe')} className='bg-red-700 rounded-lg text-white font-semibold mt-2 w-36 p-1 px-3  border'>Add REcipe</span>
    <div className='bg-black h-full w-full grid grid-cols-4 p-6 gap-4'>
         
      {/* Display the recipes */}
      {Object.values(recipes).map(recipe => (
        <RecipeCard key={recipe._id} recipe={recipe} /> // Pass each recipe as props
      ))}
    </div>
    </div>
  );
}
