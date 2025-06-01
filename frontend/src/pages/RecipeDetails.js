import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CSS/RecipeDetails.css'
import { useParams } from 'react-router-dom';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './CSS/HeartDesign.css';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);  
  const [user, setUser] = useState([]);

  useEffect(() => {
    

    const getUserInfo = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (!token) return null;

      try {
        const response = await axios.get('http://localhost:5013/api/auth/getAllUsers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        console.log(user);
      } catch (error) {
        console.error('Failed to fetch user information', error);
        return null;
      }
    };

    getUserInfo();
    fetchRecipe();
  }, [id]);
  const fetchRecipe = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get(`http://localhost:5013/api/recipe/getRecipeById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setRecipe(response.data);
      setReviews(response.data.reviews);  // Set reviews once recipe is fetched
      console.log(response.data); // Check if `image` is included in the response
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const getUserNameById = (UserId) => {
    const users = user.find((cat) => cat._id === UserId);
    return users ? users.name : 'Unknown';
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!comment) return;
    const payload = { comment, rating };
    try {
      const response = await axios.post(
        `http://localhost:5013/api/recipe/addComments/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, response.data.comment]);
      setComment('');
      setRating('')
      fetchRecipe();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  console.log(reviews);

  const [liked, setLiked] = useState(false);


  const handleSavedRecipe = async () => {
    const token = localStorage.getItem('token');
    console.log(token);
  
    try {
      const response = await axios.post(
        `http://localhost:5013/api/recipe/saveRecipe/${id}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };
  
  const toggleLike = () => {
    setLiked(!liked);

  };

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
    <div>
      {recipe ? (
        <div className="recipe-container">
        <h3 className="recipe-title">{recipe.title}</h3>
        <div className="heart-design" onClick={toggleLike}>
      {liked ? (
        <HeartFilled style={{ color: '#eb2f96', fontSize: '48px' }} />
      ) : (
        <HeartOutlined style={{ color: '#eb2f96', fontSize: '48px' }} />
      )}
    </div>
    <button onClick={handleSavedRecipe}>Save</button>
        <div className="recipe-rating">
            {renderStars(recipe.ratings)}
            <span className="rating-value">{recipe.ratings}</span>
            <span className="review-count">{reviews.length} reviews</span>
        </div>
        <h5>Description</h5>
        <p className="recipe-description">{recipe.description}</p>
        <img
            src={recipe.image}
            className="card-img-top"
            alt={recipe.title}
          />
        <h5>Ingredients</h5>
        <ul className="recipe-ingredients">
            {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ))}
        </ul>
    
        <h5>Instructions</h5>
        <ul className="recipe-instructions">
            {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
            ))}
        </ul>
    
        <div className="comments-section">
            <form onSubmit={handleCommentSubmit} className="comment-form">
                <h5>Review</h5>
                <input 
                    type="number" 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)} 
                    className="rating-input" 
                    placeholder="Rate (1-5)"
                />
                <input 
                    type="text" 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    className="comment-input" 
                    placeholder="Write your comment"
                />
                <button type="submit" className="comment-submit-button">Add</button>
            </form>
    
            <div className="reviews-section">
    {reviews.map((review, index) => (
        <div key={index} className="review-item">
            <div className="review-header">
                
                <div>
                    <span className="review-author">{getUserNameById(review.userId)}</span>
                    <span className="review-date">{new Date().toLocaleDateString()}</span>
                </div>
            </div>
            <div className="review-rating">
                {renderStars(review.rating)}
            </div>
            <p className="review-comment">{review.comment}</p>
            <div className="review-footer">
                <div className="helpful-icon">
                    <i className="fa fa-thumbs-up"></i>
                    <span className="helpful-text">Helpful ({review.helpfulCount || 0})</span>
                </div>
            </div>
        </div>
    ))}
</div>
        </div>
    </div>
    
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
};

export default RecipeDetails;
