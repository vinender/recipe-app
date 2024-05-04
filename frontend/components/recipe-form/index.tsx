import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Uploader from '../uploader/uploader';
import http from '../../utils/api/http';
import useCurrentUserDetails from '../../utils/user/currentUserDetails';
import ProtectedRoute from '../../utils/protectedRoutes';
import { useRouter } from 'next/router';
import Navbar from '../navbar/navbar';

function RecipeForm() {
    const { userDetails, loading, error } = useCurrentUserDetails();
    console.log('user deails', userDetails)
    const [serverErrors, setServerErrors] = useState({});

    const { control, handleSubmit,register, formState: { errors } } = useForm();
    const [ingredients, setIngredients] = useState([]);
    const [recipeImage, setRecipeImage] = useState('');
    const router = useRouter()

    const onSubmit = async (formData) => {
      try {
        // Prepare the payload
        const payload = {
          name: formData.name,
          category: formData.category,
          instructions: formData.instructions,
          ingredients: ingredients,
          recipe_image: recipeImage,
          created_by: userDetails?._id,
        };
    
        // Send POST request with JSON data
        const response = await http.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/recipe`, payload);
    
        // Handle response
        if (response.ok) {
          console.log('Recipe created successfully');
          const data = await response.json();
          const token = data.token;
          if (token) {
            localStorage.setItem('token', token);
          }
          router.push('/recipe')
          // Redirect or perform any other action upon successful creation
        } else {
          // Handle error response
          console.error('Failed to create recipe:', response.statusText);
          const errorData = await response.json();
          // Set serverErrors state to the received errors
          setServerErrors(errorData.errors || {});
        }
      } catch (error) {
        console.error('Recipe creation failed:', error.message);
      }
    };
    
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleAddIngredient = () => {
      const newIngredient = document.getElementById('ingredient').value;
      setIngredients([...ingredients, newIngredient]);
      document.getElementById('ingredient').value = '';
    };
  
    const handleRemoveIngredient = (indexToRemove) => {
      setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
    };
  
    const handleImageUrlChange = (imageUrl) => {
      setRecipeImage(imageUrl);
    };
  
    return(
           <ProtectedRoute> 
             <Navbar  />
         <div className="flex h-screen w-full flex-col bg-black text-black justify-center px-6 py-12 lg:px-8">
         <button onClick={()=>router.push('/recipe')} className='bg-red-700 rounded-lg text-white font-semibold mt-2 w-36 p-1 px-3  border'>All Recipe</button>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Create Recipe</h2>
        </div>
  
        <div className="mt-10 sm:mx-auto text-white sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">Recipe Name</label>
              <div className="mt-2">
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input {...field} type="text" autoComplete="off" className="block w-full rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" />
                  )}
                />
                {/* Display server validation error for Recipe Name */}
                {serverErrors.name && <p className="text-red-500 text-xs italic">{serverErrors.name}</p>}
                {/* Display client validation error for Recipe Name */}
                {errors.name && <p className="text-red-500 text-xs italic">Recipe name is required.</p>}              </div>
            </div>
  
            <div className="">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">Category</label>
              <div className="mt-2">
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select {...field} className="block w-full p-2 rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6">
                      <option value="">Select Category</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                    </select>
                  )}
                />
                 {/* Display server validation error for Category */}
                 {serverErrors.category && <p className="text-red-500 text-xs italic">{serverErrors.category}</p>}
                {/* Display client validation error for Category */}
                {errors.category && <p className="text-red-500 text-xs italic">Category is required.</p>}
              </div>
            </div>
  
          {/* Ingredients */}
      <div className="">
          <label htmlFor="ingredients" className="block text-sm font-medium leading-6 text-white">Ingredients</label>
          <div className="mt-2 flex">
              <input
                  type="text"
                  id="ingredient"
                  autoComplete="off"
                  {...register("ingredients", { required: false })} // Register the ingredients field with validation rules
                  className={`block w-full rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 ${errors.ingredients ? 'border-red-500' : ''}`} // Add conditional border color based on validation error
              />
              <button type="button" onClick={handleAddIngredient} className="ml-2 px-3 py-1.5 bg-gray-500 rounded-md text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-red-500">Add</button>
          </div>
          {/* Display validation error */}
          {/* {(!ingredients && errors.ingredients) && (
              <p className="mt-1 text-xs text-red-500">Ingredients are required.</p>
          )} */}
    <div className="flex space-x-1 mt-2">
        {/* Display added ingredients */}
        {ingredients?.map((ingredient, index) => (
            <div key={index} className="flex items-center mt-1">
                <span className="text-black rounded-lg p-2 bg-white text-sm">{ingredient}</span>
                <button type="button" onClick={() => handleRemoveIngredient(index)} className="text-red-500 ml-1">X</button>
            </div>
        ))}
    </div>
</div>

  
            <div className="">
              <label htmlFor="instructions" className="block text-sm font-medium leading-6 text-white">Description</label>
              <div className="mt-2">
                <Controller
                  name="instructions"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <textarea {...field} className="block w-full rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" />
                  )}
                />
                   {/* Display server validation error for Instructions */}
                   {serverErrors.instructions && <p className="text-red-500 text-xs italic">{serverErrors.instructions}</p>}
                {/* Display client validation error for Instructions */}
                {errors.instructions && <p className="text-red-500 text-xs italic">Instructions are required.</p>}
              </div>
            </div>
  
            <div className="">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-white">Description</label>
              <div className="mt-2">
               <Uploader onImageUrlChange={handleImageUrlChange} />
              </div>
            </div>
  
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Create Recipe</button>
            </div>
          </form>
        </div>
      </div>
      </ProtectedRoute>
  );
}

export default RecipeForm;
