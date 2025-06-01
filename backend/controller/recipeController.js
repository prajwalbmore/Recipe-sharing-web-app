const recipeModel = require("../model/recipeModel");

async function createRecipe(req,res){
    const userId = req.user._id;
    const {title,description,ingredients,instructions,category} = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const existingRecipe = await recipeModel.findOne({title});
        if(existingRecipe){
                return res.status(400).send({ msg: "Recipe already exists", success: false });
        }

        const newRecipe = new recipeModel({
            title,
            description,
            ingredients,
            instructions,
            category,
            image,
            author:userId,
            createAt:Date.now()
        })

        await newRecipe.save();
        res.status(201).send({ msg: "Recipe created successfully", success: true });
    } catch (error) {
        console.log(error);
        
        return res.status(500).send(error);
    }
}

async function getAllRecipes(req,res){
    try {
        const recipes = await recipeModel.find();
        if(!recipes.length){
            return res.status(404).send({ msg: "No users found", success: false });
        }
        console.log(recipes);
        const modifiedRecipes = recipes.map((recipes)=>({
            _id: recipes._id,
            title: recipes.title,
            description: recipes.description,
            category: recipes.category,
            image: recipes.image ? `http://localhost:5013/uploads/${recipes.image}` : null,
            ingredients:recipes.ingredients,
            instructions:recipes.instructions,
            author:recipes.author,
            createdAt:recipes.createdAt,
            reviews:recipes.reviews,
            ratings:recipes.ratings
        }
    ))

        return res.status(200).send(recipes);
    } catch (error) {
        return res.status(500).send({ error });
    }
}

async function updateRecipe(req,res){
    const {title,description,ingredients,instructions,category} = req.body;
    const id = req.params.id
    try {
        let recipe = await recipeModel.findById(id)
        if(!recipe){
            return res.status(404).json({ msg: 'Recipe not found' });
        }

        recipe.title = title || recipe.title;
        recipe.description = description || recipe.description;
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.instructions = instructions || recipe.instructions;
        recipe.category = category || recipe.category;

        await recipe.save();
        return res.status(200).send({msg:'Rercipe updated Successfully',success:true})

    } catch (error) {
        return res.status(500).send(error);
    }
}

async function deleteRecipe(req,res){
    try {
        const id = req.params.id;
        let recipe = await recipeModel.findByIdAndDelete(id);
        if(!recipe){
            return res.status(404).send({mes:"Recipe not Found"})
        }

        return res.status(200).send({ msg: 'Recipe Deleted' ,success:true});

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Server error", success: false });
    }
}

async function getRecipesByUser(req,res){
    try {
        const recipe = await recipeModel.find({ author: req.user._id });     
    
        if (recipe.length === 0) {
          return res.status(404).json({ message: "No recipe found for this user" });
        }

        const modifiedRecipes = recipe.map((recipes)=>({
            _id: recipes._id,
            title: recipes.title,
            description: recipes.description,
            category: recipes.category,
            image: recipes.image ? `http://localhost:5013/uploads/${recipes.image}` : null,
            ingredients:recipes.ingredients,
            instructions:recipes.instructions,
            author:recipes.author,
            createdAt:recipes.createdAt,
            reviews:recipes.reviews,
            ratings:recipes.ratings
        }
    ))
        res.status(200).send( modifiedRecipes );
      } catch (error) {
          console.log(error);
        res.status(500).send({ message: "Server Error", error });
      }
}

const getRecipeById = async(req,res) =>{

    try {
        const recipes = await recipeModel.findById(req.params.id)
        
        if(!recipes){
            return res.status(404).send({ error: "recipe not found", success: false });
        }

        const modifiedRecipe = {
            _id: recipes._id,
            title: recipes.title,
            description: recipes.description,
            category: recipes.category,
            image: recipes.image ? `http://localhost:5013/uploads/${recipes.image}`: null,
            ingredients:recipes.ingredients,
            instructions:recipes.instructions,
            author:recipes.author,
            createdAt:recipes.createdAt,
            reviews:recipes.reviews,
            ratings:recipes.ratings
        }

        return res.status(200).send(modifiedRecipe)
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Server error", success: false });
    }
}


//reveiws
async function addReviews(req,res){
    const userId = req.user._id
    const {comment,rating} = req.body;
    const id = req.params.id
    try {
        const recipe = await recipeModel.findById(id);
        if(!recipe){
            return res.status(404).send({msg:'recipe not found'})
        }           
        const newReview = {
            userId:userId,
            comment:comment,
            rating:rating
        }
         recipe.reviews = [...recipe.reviews,newReview]
          
         if(recipe.ratings.length === 0 ){
            recipe.ratings = recipe.ratings + parseInt(rating);
         }else{
            recipe.ratings = parseInt(recipe.ratings) + parseInt(rating);
         }
         await recipe.save();  
         return res.status(200).send({msg:'review added successfully'})
    } catch (error) {
        console.log(error);
        
        return res.status(500).send( error );
    }
}

async function getAllReveiws(req,res) {
    try {
        const recipe = await recipeModel.find();
        console.log(recipe);
        
        return res.status(200).send(recipe)

    } catch (error) {
        return res.status(500).send( error );

    }
}

module.exports = {
    createRecipe,
    getAllRecipes,
    updateRecipe,
    deleteRecipe,
    getRecipesByUser,
    addReviews,
    getRecipeById,
    getAllReveiws
}