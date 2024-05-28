import { useState, useEffect } from "react";
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserId';
import { useNavigate } from 'react-router-dom'

const CreateRecipe = () => {
  const userID = useGetUserId();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [''],
    instructions: '',
    image: '',
    cookingTime: 0,
    userOwner: ''
  });

  useEffect(() => {
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      userOwner: userID
    }));
  }, [userID]);

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const addIngredients = () => {
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, '']
    }));
  };

  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    setRecipe(prevRecipe => {
      const updatedIngredients = prevRecipe.ingredients.map((ingredient, i) => (
        i === index ? value : ingredient
      ));
      return {
        ...prevRecipe,
        ingredients: updatedIngredients
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/recipes", recipe);
      alert("Recipe created successfully!");
      setRecipe({
        name: '',
        ingredients: [''],
        instructions: '',
        imageurl: '',
        cookingTime: 0,
        userOwner: userID
      });
      navigate('/')
    } catch (error) {
      console.error("There was an error creating the recipe:", error);
      alert("Failed to create recipe. Please try again.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-10">
      <h2 className="py-4 text-4xl font-bold">Create Recipe</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={recipe.name}
          onChange={handleChange}
          className="border border-black w-[300px] p-2"
        />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index} 
            type="text" 
            name="ingredients" 
            id="ingredients" 
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, index)}
            className="border border-black w-[300px] p-2"
          />
        ))}
        <button
          type="button" 
          onClick={addIngredients}
          className="border border-black capitalize"
        >
          Add Ingredients
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea 
          name="instructions" 
          id="instructions" 
          value={recipe.instructions}
          onChange={handleChange}
          className="border border-black w-[300px] p-2"
        ></textarea>
        <label htmlFor="imageurl">Image URL</label>
        <input 
          type="text" 
          name="image" 
          id="image" 
          value={recipe.imageurl}
          onChange={handleChange}
          className="border border-black w-[300px] p-2"
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input 
          type="number" 
          name="cookingTime" 
          id="cookingTime" 
          value={recipe.cookingTime}
          onChange={handleChange}
          className="border border-black w-[300px] p-2"
        />
        <button 
          type="submit"
          className="border border-black"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;