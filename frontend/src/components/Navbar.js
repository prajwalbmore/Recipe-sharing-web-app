import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) return null;
    
            try {
                const response = await axios.get('http://localhost:5013/api/auth/userInfo', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user information', error);
                return null;
            }
        };

        getUserInfo();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser('');
        navigate("/login");
    };

    return (
        <div>
            <nav className="custom-navbar navbar-expand-lg navbar-light bg-light">
                <Link to='/dashboard' className="navbar-brand" href="#">allRecipes</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse custom-navbar-collapse" id="navbarSupportedContent">
                    <ul className="custom-navbar-nav navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to='/dashboard' className="nav-link">Home</Link>
                        </li>
                    </ul>

                    <form className="custom-form-inline my-2 my-lg-0">
                        <input className="custom-form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="custom-btn btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
