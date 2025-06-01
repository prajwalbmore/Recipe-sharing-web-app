const savedRecipeModel = require("../model/savedRecipeModel");

async function saveRecipe(req, res) {
  const id = req.user._id;  // This should be the user's ID from the authenticated user object
  const  recipeId  = req.params.id; // Accessing recipeId from the request body
  console.log(req.params.id,id);
  

  try {
    // Check if the recipe is already saved by this user
    const existingSavedRecipe = await savedRecipeModel.findOne({ userId: id, recipeId: recipeId });

    if (existingSavedRecipe) {
      return res.status(400).send({ msg: "Recipe already exists", success: false });
    } else {
      // Create and save the new saved recipe entry
      const newSavedRecipe = new savedRecipeModel({
        userId: id,
        recipeId: recipeId,
      });

      await newSavedRecipe.save();

      return res.status(201).send({ msg: "Recipe Saved successfully", success: true });
    }
  } catch (error) {
    return res.status(500).send({ msg: "Error saving recipe", error: error.message });
  }
}


async function getAllSavedRecipes(req, res) {
  try {
    // Fetch all saved recipes
    const savedRecipes = await savedRecipeModel.find();
    
    return res.status(200).send(savedRecipes);  // Correctly send the data
  } catch (error) {
    return res.status(500).send({ msg: "Error fetching saved recipes", error: error.message });
  }
}

module.exports = {
  saveRecipe,
  getAllSavedRecipes,
};
