const User = require('../model/userModel');
const jwt = require('jsonwebtoken')

async function register(req, res){
    const {name,email,password} = req.body;
    
      try {
        const user = await User.findOne({ email });
        if (!user) {
          const image = req.file ? req.file.filename : null;
          const newUser = new User({
            name,
            email,
            password,
            createdAt: Date.now(),
          });
          await newUser.save();
    
          res.status(200).send({ message: "User registered successfully", success: true });
        } else {
          res.status(400).send({ message: "User already exists", success: false });
        }
      } catch (error) {
        res.status(500).send({ message: error.message, success: false });
        console.log(error)
      }
}

async function login (req, res){
    
    try {
        const  email = req.body.email;
        const newPassword = req.body.password;
        const user = await User.findOne({email:email});
        console.log(user);
        if(!user){
            return res.status(400).send({ error: 'Invalid login credentials',success:false});
        }
        isMatch = await user.comparePassword(newPassword);
        if(isMatch){
            const payload = {_id: user._id, name:user.name };
            const token = jwt.sign(payload,'prajwal', { expiresIn: '10h' });
            
            return res.status(200).send({message : "Login Successful", token : token, success : true});   
        }else{
            return res.status(401).send({error : 'Password Incorrect'}) 
        }
        
    } catch (error) { 
       return res.status(500).json({error:error});
    }
}

async function getAllUsers(req,res) {
    try {
        const user = await User.find();
        if(!user.length){
            return res.status(404).send({ msg: "No users found", success: false });
        }
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error });
    }
}

async function userInformation(req, res) {
    const id = req.user._id; 
  
    try {
      const user = await User.findOne({ _id: id });
      
      if (!user) {
        return res.status(404).send({ message: 'User not found.', success: false });
      }
  
      const modifiedUser = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
    
      return res.status(200).send( modifiedUser);
    } catch (error) {
      console.error(error); 
      return res.status(500).send({ error: 'Server error occurred.' });
    }
  }

  async function givePermision(req,res) {
    
    try {
      
    } catch (error) {
      return res.status(500).send(error);
    }    
  }
module.exports = {
    register,
    login ,
    userInformation,
    getAllUsers
}