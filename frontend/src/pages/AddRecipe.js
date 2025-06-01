import axios from "axios";
import React, { useState } from "react";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [modifiedIngredients, setIngredients] = useState([]);
  const [modifiedInstructions, setInstructions] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User is not authenticated.");
      return;
    }

    const ingredients = modifiedIngredients.split(";");
    const instructions = modifiedInstructions.split(";");

    const payload = {
      title,
      description,
      ingredients,
      instructions,
      category,
      image,
    };

    try {
      await axios.post(
        "http://localhost:5013/api/recipe/createRecipe",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      setError("Error adding product. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <lable htmlFor="productName">Title</lable>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <lable htmlFor="image">Image</lable>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productPrice">Description</label>
          <input
            type="text"
            className="form-control"
            id="productPrice"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productQuantity">Ingredients</label>
          <input
            type="text"
            className="form-control"
            id="productQuantity"
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productQuantity">Instructions</label>
          <input
            type="text"
            className="form-control"
            id="productQuantity"
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productQuantity">Category</label>
          <input
            type="text"
            className="form-control"
            id="productQuantity"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
