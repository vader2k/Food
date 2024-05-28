import express from 'express'
import { 
    getAllRecipes, 
    createRecipe, 
    saveRecipe,
    savedRecipes,
    savedRecipesId 
} from '../controllers/recipesController.js'

const router = express.Router()

router.get('/', getAllRecipes)
router.post('/', createRecipe)
router.put('/', saveRecipe)
router.get('/savedRecipes', savedRecipes)
router.get('/savedRecipes/id', savedRecipesId)


export {router as recipesRouter}