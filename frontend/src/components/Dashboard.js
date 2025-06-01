import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AddRecipe from "../pages/AddRecipe";
import RecipeList from "../pages/RecipeList";
import MyRecipe from "../pages/MyRecipe";
import './Dashboard.css'; // Import the CSS file
import SavedRecipe from "../pages/SavedRecipe";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [islogout, setIslogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(
          "http://localhost:5005/api/auth/userInfo",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, []);

  const handlelogout = () => {
    localStorage.removeItem("token");
    setIslogout(true);
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h3>Dashboard</h3>
        <Link to="addRecipe" className="btn btn-primary">Add Recipe</Link>
        <Link to="myRecipe" className="btn btn-primary">My Recipe</Link>
        <Link to="savedRecipe" className="btn btn-primary">Saved Recipe</Link>
        <button onClick={handlelogout} className="btn btn-primary">Logout</button>
      </div>
      <div className="main-content">
        <Navbar className="navbar-custom" />
        <Routes>
          {/* Define all routes inside Routes component */}
          <Route path="addRecipe" element={<AddRecipe />} />
          <Route path="myRecipe" element={<MyRecipe />} />
          <Route path="/" element={<RecipeList />} /> {/* Default route for dashboard */}
          <Route path="savedRecipe" element={<SavedRecipe/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
