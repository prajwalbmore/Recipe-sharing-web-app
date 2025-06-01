import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './CSS/MyRecipeDetails.css'
import { useParams } from 'react-router-dom';
import { FaShareAlt } from "react-icons/fa";

import { StarFilled, StarOutlined } from '@ant-design/icons';
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";

const MyRecipeDetails = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);  
    const [user, setUser] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [updatedCategory, setUpdatedCategory] = useState("");

    const [checkedUsers, setCheckedUsers] = useState([]);


    useEffect(() => {   
        getUserInfo();
        fetchRecipe();
    }, [id,user]);

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

    const getUserNameById = (UserId) => {
        const users = user.find((cat) => cat._id === UserId);
        return users ? users.name : 'Unknown';
    };

    const handleShowModal = () => {
        if (recipe) {
            setSelectedRecipe(recipe);  // Set selectedRecipe to the current recipe
            setUpdatedTitle(recipe.title);
            setUpdatedDescription(recipe.description);
            setUpdatedCategory(recipe.category);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleUpdateRecipe = () => {
        axios
            .put(
                `http://localhost:5013/api/recipe/updateRecipes/${selectedRecipe._id}`,  // Ensure this is the correct API endpoint
                {
                    title: updatedTitle,
                    description: updatedDescription,
                    category: updatedCategory,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            )
            .then(() => {
                handleCloseModal();
                setRecipe({
                    ...recipe,
                    title: updatedTitle,
                    description: updatedDescription,
                    category: updatedCategory,
                });
            })
            .catch((error) => console.error("Failed to update recipe:", error));
    };


    const handleCheckboxChange = (id) => {
        setCheckedUsers((prevCheckedUsers) =>
          prevCheckedUsers.includes(id)
            ? prevCheckedUsers.filter((itemId) => itemId !== id) // Remove from array if checked
            : [...prevCheckedUsers, id] // Add to array if unchecked
        );
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
                <div className='w-50 m-5'>
                    <div className="card-body">
                    <button 
                        type="button" 
                        class="btn btn-info mr-2 float-right" 
                        data-toggle="modal" 
                        data-target="#exampleModal">
                        <FaShareAlt />
                    </button>
                        
                        <h3 className="card-title">{recipe.title}</h3>
                        <div>
                            <button className='btn btn-danger mr-2 float-right'>Delete</button>
                            <button className='btn btn-warning mr-4 float-right' onClick={handleShowModal}>Edit</button> 
                        </div>
                        <h5>Category : {recipe.category}</h5>
                        <p className="card-text">Ratings: {renderStars(recipe.ratings)}<span>{recipe.ratings}</span></p>
                        <h5>Description</h5>
                        <p>{recipe.description}</p>
                        <img
                            src={recipe.image}
                            className="card-img-top"
                            alt={recipe.title}
                        />
                        
                        <h5>Ingredients</h5>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>

                        <h5>Instructions</h5>    
                        <ul>
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ul>
    
                        <h5 className="mt-4">Comments</h5>
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

            {/* Update Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedTitle}
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={updatedDescription}
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedCategory}
                                onChange={(e) => setUpdatedCategory(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateRecipe}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>




            {/* Share */}

            


{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <ul>
            {user.map((user)=>(
                <div key={user._id}>
                    <input
                        type="checkbox"
                        id={`checkbox-${user._id}`}
                        checked={checkedUsers.includes(user._id)}
                        onChange={() => handleCheckboxChange(user._id)}
                    />
                    <label htmlFor={`checkbox-${user._id}`}>{user.name}</label>
                </div>
            ))}
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
}

export default MyRecipeDetails;
