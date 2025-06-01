const mongoose = require('mongoose');

const savedSchema = mongoose.Schema({
    
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
          },
          recipeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe", 
          }

})

module.exports = mongoose.model('savedRecipes',savedSchema)