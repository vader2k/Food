import { recipeModel } from "../models/recipes.js";
import { UserModel } from "../models/Users.js"; 

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
        return res.status(200).json({success:true, message:"recipe created", data:response})
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}

export const saveRecipe = async (req, res) => {
    try {
        const recipe = await recipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        return res.status(200).json({success:true, message:"recipe saved", data:user.savedRecipes})
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}

export const savedRecipesId = async (req,res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        return res.status(200).json({success:true, data:user?.savedRecipes})
    } catch (error) {
        return res.json(error)
    }
}

export const savedRecipes = async (req,res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        const savedRecipes = await recipeModel.find({
            _id: {$in: user?.savedRecipes}
        })
        res.json(savedRecipes)
    } catch (error) {
        res.json(error)
    }
}