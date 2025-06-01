import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StarFilled, StarOutlined } from '@ant-design/icons';
import axios from "axios";

const SavedRecipe = () => {
  const [recipes, setRecipe] = useState([]);
  const [savedRecipe,setSavedRecipe] = useState([])
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSavedRecipes();
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:5013/api/recipe/getAllRecipes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecipe(response.data);
      

    } catch (error) {
      setError("Error fetching products");
    }
  };
  const fetchSavedRecipes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:5013/api/recipe/getAllSavedRecipes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     setSavedRecipe(response.data)
     console.log('SavedRecipes',savedRecipe);
     
      

    } catch (error) {
      setError("Error fetching products");
    }
  };


  const filterdRecipes = (recipeId) =>{
    const recipe = recipes.filter((recipe) => recipe.id === recipeId);
    return recipe
  }


  const renderStars = (rating) => {
    const validRating = Math.max(0, Math.min(5, Math.floor(rating || 0))); 
    const fullStars = validRating;
    const emptyStars = 5 - fullStars;

    return (
      <>
        {Array(fullStars).fill().map((_, index) => (
          <StarFilled key={`filled-${index}`} style={{ color: '#fadb14', fontSize: '25px' }} />
        ))}
        {Array(emptyStars).fill().map((_, index) => (
          <StarOutlined key={`outlined-${index}`} style={{ color: '#fadb14', fontSize: '25px' }} />
        ))}
      </>
    );
  };

  return (
    <div className="recipe-list-container">
  {error && <p className="error-message">{error}</p>}
  {recipes.map((recipe) => (
    <div key={recipe._id} className="recipe-card col-12 col-sm-6 col-md-4 col-lg-3">
      <Link to={`/dashboard/recipe/${recipe._id}`}>
      
        <img
          src={`http://localhost:5013/uploads/${recipe.image}`}
          className="card-img-top"
          alt={recipe.title}
        />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">Ratings: {renderStars(recipe.ratings)}<span>({recipe.ratings})</span></p>
        </div>
      </Link>
    </div>
  ))}
</div>

  );
}

export default SavedRecipe