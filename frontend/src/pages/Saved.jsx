import { useState, useEffect } from "react"
import axios from 'axios'
import { useGetUserId } from "../hooks/useGetUserId"

const Saved = () => {
  const userID = useGetUserId()
  const [recipes, setRecipes] = useState([])


  useEffect(() => {

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipes/savedRecipes/${userID}`)
        setRecipes(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    
    fetchSavedRecipe()
  }, [userID])



  return (
    <section className="w-full flex flex-col items-center justify-center py-10">
      <h2 className="py-10 font-bold text-3xl">Saved Recipes</h2>
      <ul className="flex flex-col gap-10">
        {recipes?.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2 className="text-center text-2xl font-medium capitalize">{recipe.name}</h2>
            </div>
            <div>
              <p>{recipe.instructions}</p>
            </div>
            <img className="w-[300px] object-contain" src={recipe.image} alt={recipe.name} />
            <p>{recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Saved