import express from 'express'
import { 
    getAllRecipes, 
    createRecipe, 
    saveRecipe,
    savedRecipes,
    savedRecipesId 
} from '../controllers/recipesController.js'
import { verify } from '../controllers/authController.js'

const router = express.Router()

router.get('/', getAllRecipes)
router.post('/', verify, createRecipe,)
router.put('/', verify, saveRecipe,)
router.get('/savedRecipes/:userID', savedRecipes)
router.get('/savedRecipes/id/:userID', savedRecipesId)


export {router as recipesRouter}