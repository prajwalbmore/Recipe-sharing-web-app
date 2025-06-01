const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
      },
    description: {
        type: String,
      },
    ingredients: [
        {
        type: String,
        }
    ],
    instructions: [
        {
        type: String,
        
      }
    ],
    category: {
        type: String,
        required: true,
      },
    author: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User' 
        },
    image: {
        type: String,
      },
    ratings: [{
        type: Number
      }],
    reviews: [{ 
        userId: mongoose.Schema.Types.ObjectId,
         comment: {type: String},
         rating: {type: Number}
        }],
    createdAt: { 
        type: Date,
         default: Date.now 
        }
});

module.exports = mongoose.model('Recipe',RecipeSchema)