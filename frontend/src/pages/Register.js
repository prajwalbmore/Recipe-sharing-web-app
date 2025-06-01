import React, { useState } from "react";
import "./CSS/Register.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email , setEmail] = useState('') ;

    const navigate = useNavigate();

    const register = async(payload)=>{
        try {
            const response = await axios.post('http://localhost:5013/api/auth/register',payload);
            console.log(response.data);
            if(response.data.success){
                toast.success("Registration Successful");
                navigate("/login");
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Registration failed");
        }
    }
    
     function handleRegister(e){
        e.preventDefault();
        const payload = {name,email,password,}
        console.log(payload);
        register(payload);
        
    };
  return (
    <div className="container-fluid ">
      <form>
        <h3 className="head">Register</h3>
        <div class="form-group">
          <label for="exampleInputName1">Name</label>
          <input 
            type="text" 
            class="form-control" 
            id="exampleInputName1" 
            onChange={(e)=>{setName(e.target.value)}}
            />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        
        
        <button type="submit" class="btn btn-primary" onClick={handleRegister}>
          Register
        </button>
      </form>
      {/* <ToastContainer/> */}
    </div>
  );
};

export default Register;
