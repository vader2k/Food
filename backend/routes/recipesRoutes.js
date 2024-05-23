import express from 'express'
import { getAllRecipes, createRecipe } from '../controllers/recipesController.js'

const router = express.Router()

router.get('/', getAllRecipes)
router.post('/', createRecipe)

export {router as recipesRouter}