const express = require('express')
const recipeController = require('../controller/recipeController')
const savedRecipeController = require('../controller/savedRecipeController')
const { auth } = require('../middleware/auth');
const upload = require('../middleware/multer');
const router = express.Router();

router.post('/createRecipe',auth,upload.single('image'),recipeController.createRecipe);
//http://localhost:5013/api/recipe/createRecipe

router.get('/getAllRecipes',auth,recipeController.getAllRecipes);
//http://localhost:5013/api/recipe/getAllRecipes

router.put('/updateRecipes/:id',auth,recipeController.updateRecipe)
//http://localhost:5013/api/recipe/updateRecipes/:id

router.delete('/deleteRecipe/:id',auth,recipeController.deleteRecipe);
//http://localhost:5013/api/recipe/deleteRecipe/:id

router.get('/getRecipesByUser',auth,recipeController.getRecipesByUser)
//http://localhost:5013/api/recipe/getRecipesByUser

router.get('/getRecipeById/:id',auth,recipeController.getRecipeById)
//http://localhost:5013/api/recipe/getRecipeById/:id

router.get('/getRecipesByUser',auth,recipeController.getRecipesByUser)
//http://localhost:5013/api/recipe/getRecipesByUser



//comments
router.post('/addComments/:id',auth,recipeController.addReviews)
//http://localhost:5013/api/recipe/addComments/:id

router.get('/getAllReveiws',auth,recipeController.getAllReveiws)
//http://localhost:5013/api/recipe/getAllReveiws


//Save Recipe

router.post('/saveRecipe/:id',auth,savedRecipeController.saveRecipe)
//http://localhost:5013/api/recipe/saveRecipe

router.get('/getAllSavedRecipes',auth,savedRecipeController.getAllSavedRecipes)
//http://localhost:5013/api/recipe/getAllSavedRecipes
 
 
module.exports = router;   


//echo "# Recipe-Sharing-web-app" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/prajwalbmore/Recipe-Sharing-web-app.git
// git push -u origin main