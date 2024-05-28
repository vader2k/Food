import { useState } from "react"

const CreateRecipe = () => {

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [],
    instructions: '',
    imageurl: '',
    cookingTime: 0,
    userOwner:0
  })

  const handleChange = (e)=>{
    setRecipe({
     ...recipe,
      [e.target.name]: e.target.value
    })
  }

  const addIngredients = () => {
    setRecipe({
     ...recipe,
      ingredients: [...recipe.ingredients, '']
    })
  }

  const handleIngredientChange = (e, index) => {
    const {value} = e.target.value;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({
     ...recipe,
      ingredients
    })
  }

  console.log(recipe)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-10">
      <h2 className="py-4 text-4xl font-bold">Create Recipe</h2>
      <form className="flex flex-col gap-3">
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          onChange={handleChange}
          className="border border-black w-[300px] p-2"
        />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredients, index) => (
          <input
            key={index} 
            type="text" 
            name="ingredients" 
            id="ingredients" 
            value={ingredients}
            onChange={(e) => handleIngredientChange(e, index)}
            className="border border-black w-[300px] p-2"
          />
        ))}
        <button 
          onClick={addIngredients}
          className="border border-black capitalize"
        >
            add ingredients
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea 
          name="instructions" 
          id="instructions" 
          onChange={handleChange}
          className="border border-black w-[300px] p-2"
        ></textarea>
        <label htmlFor="imageurl">Image url</label>
        <input 
          type="text" 
          name="imageurl" 
          id="imageurl" 
          onChange={handleChange}
          className="border border-black w-[300px] p-2"
        />
        <label htmlFor="cookingTime">cooking time (minutes)</label>
        <input 
          type="number" 
          name="cookingTime" 
          id="cookingTime" 
          onChange={handleChange}
          className="border border-black w-[300px] p-2"
        />
      </form>
    </div>
  )
}

export default CreateRecipe