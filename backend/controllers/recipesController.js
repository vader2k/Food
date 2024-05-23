import { recipeModel } from "../models/recipes.js"; 

export const getAllRecipes = async (req,res) => {
    try {
        const response = await recipeModel.find({});
        return res.status(200).json({success:true, message:"recipes found", data:response})
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}

export const createRecipe = async (req, res) => {
    const recipe = new recipeModel(req.body)
    try {
        const response = await recipe.save();
        return res.status(200).json({success:true, message:"recipes saved", data:response})
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}