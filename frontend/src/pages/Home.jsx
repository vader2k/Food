import { useState, useEffect } from "react"
import axios from 'axios'
import { useGetUserId } from "../hooks/useGetUserId"

const Home = () => {
  const userID = useGetUserId()
  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipes`)
        setRecipes(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipes/savedRecipes/id/${userID}`)
        setSavedRecipes(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    
    fetchRecipe() 
    fetchSavedRecipe()
  }, [userID])

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3000/api/v1/recipes", {
        recipeID,
        userID
      })
      setSavedRecipes(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="w-full flex flex-col items-center justify-center py-10">
      <h2 className="py-10 font-bold text-3xl">Recipes</h2>
      <ul className="flex flex-col gap-10">
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2 className="text-center text-2xl font-medium capitalize">{recipe.name}</h2>
              {savedRecipes?.includes(recipe._id) 
                ? <span className="font-medium text-[0.9rem]">Already saved</span> 
                : <button 
                    onClick={()=> saveRecipe(recipe._id)}
                    className="border border-black text-[0.9rem] font-medium uppercase p-1 bg-black text-white"
                  >
                    save
                  </button>}
            </div>
            <div>
              <p className="max-w-[500px]">{recipe.instructions}</p>
            </div>
            <img className="w-[300px] object-contain" src={recipe.image} alt={recipe.name} />
            <p>{recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Home