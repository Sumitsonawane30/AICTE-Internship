import {Recipe} from '../Models/Recipe.js'
import {SavedRecipe} from '../Models/SavedRecipe.js'

export const add = async (req, res) => {
  const { title, ist, imgurl, ingredients } = req.body;

  try {
    console.log("Received Ingredients:", ingredients); // ✅ Debugging log

    const recipe = await Recipe.create({
      title,
      ist,
      imgurl,
      ingredients, // Store as it is
      user: req.user,
    });

    console.log("Saved Recipe:", recipe); // ✅ Debugging log

    res.json({ message: "Recipe Created Successfully..!", recipe });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ message: "Error adding recipe", error });
  }
};


export const getAllRecipe = async (req,res) =>{
    const recipe = await Recipe.find();
    res.json({recipe}) 
}


export const getRecipeById = async (req, res) => {
  const id = req.params.id;
  try { 
    let recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.json({ message: 'Recipe does not exist' }); // ✅ Using return
    }

    res.json({ message: "Recipe by ID", recipe });
    
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getRecipeByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    let recipe = await Recipe.find({ user: userId });

    if (!recipe || recipe.length === 0) {
      return res.json({ message: "Recipe does not exist" }); // ✅ Using return
    }

    res.json({ message: "Recipes by user ID", recipe });
  } catch (error) {
    console.error("Error fetching recipe by user ID:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const savedRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // Get user from request

    let recipe = await SavedRecipe.findOne({ recipe: id, user: userId });

    if (recipe) {
      return res.json({ message: "Recipe already saved" });
    }

    await SavedRecipe.create({ recipe: id, user: userId });

    res.json({ message: "Recipe saved Successfully..!" });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getSavedRecipe  = async (req,res) =>{
    const recipe = await SavedRecipe.find()
    res.json({recipe})
}


export const deleteRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }

    res.json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


