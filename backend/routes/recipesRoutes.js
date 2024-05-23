import express from 'express'
import { getAllRecipes, createRecipe, saveRecipe } from '../controllers/recipesController.js'

const router = express.Router()

router.get('/', getAllRecipes)
router.post('/', createRecipe)
router.put('/', saveRecipe)


export {router as recipesRouter}