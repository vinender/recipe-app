import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Uploader from '../uploader/uploader';
import http from '../../utils/api/http';

function RecipeForm() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [ingredients, setIngredients] = useState([]);
    const [recipeImage, setRecipeImage] = useState('');
    
    const onSubmit = async (formData) => {
      try {
        formData.ingredients = ingredients;
        formData.recipe_image = recipeImage;
        
        const response = await http.post(`${process.env.REACT_APP_API_URL}/recipe`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        console.log('Recipe created successfully:', response.data);
        const token = response.data.token;
        if (token) {
          localStorage.setItem('token', token);
        }
      } catch (error) {
        console.error('Recipe creation failed:', error.response.data);
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
        <div className="flex h-screen w-full flex-col bg-black text-black justify-center px-6 py-12 lg:px-8">
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
                {errors.name && <p className="text-red-500 text-xs italic">Recipe name is required.</p>}
              </div>
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
              </div>
            </div>
  
            <div className="">
              <label htmlFor="ingredients" className="block text-sm font-medium leading-6 text-white">Ingredients</label>
              <div className="mt-2 flex">
                <input type="text" id="ingredient" autoComplete="off" className="block w-full rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" />
                <button type="button" onClick={handleAddIngredient} className="ml-2 px-3 py-1.5 bg-gray-500 rounded-md text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-red-500">Add</button>
              </div>
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
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-white">Description</label>
              <div className="mt-2">
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <textarea {...field} className="block w-full rounded-md border-0 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" />
                  )}
                />
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
  );
}

export default RecipeForm;
