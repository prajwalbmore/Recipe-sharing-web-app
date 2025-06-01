import axios from 'axios';
import React, { useState } from 'react'
import './CSS/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const login = async(payload) =>{
        try {
            const response = await axios.post('http://localhost:5013/api/auth/login',payload);
            const token = response.data.token
            localStorage.setItem('token',token);
            console.log('Login Successfull')
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogin = (event) => {
        event.preventDefault();
        const payload = {email,password}
        login(payload)
    }
  return (

    <section className="h-100 h-custom" style={{ backgroundColor: 'lightblue' }}>
      <div className="container py-5 h-900" style={{ height: "100vh" }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-6 col-xl-5">
            <div
              className="card rounded-3"
              style={{ width: "100%", maxWidth: "500px" }}
            >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login</h3>

                <form className="px-md-2" onSubmit={handleLogin}>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={email}
                      onChange={(e)=>{setEmail(e.target.value)}}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e)=>{setPassword(e.target.value)}}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success btn-lg mb-1"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Login
                  </button>
                  <h8 style={{ marginLeft: "20%" }}>
                    You have to register first!{" "}
                    <Link to="/register">
                      <span type="button" style={{ color: "blue" }}>
                        Register
                      </span>
                    </Link>
                  </h8>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}

export default Login