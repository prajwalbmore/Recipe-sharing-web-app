import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const MyRecipe = () => {

    const [recipes, setRecipe] = useState([]);
    const [error, setError] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:5013/api/recipe/getRecipesByUser",
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
  return (
    <div>
      {error && <p>{error}</p>}
      {recipes.map((recipe) => (
        <div key={recipe._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Link to={`/dashboard/recipe/my/${recipe._id}`}>
            <div className="card mb-3">
              <img
                src={recipe.image} // Corrected to recipe.image
                className="card-img-top"
                alt={recipe.title}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">Ratings: {recipe.ratings}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default MyRecipe