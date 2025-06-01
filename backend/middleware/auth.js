const jwt = require ('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();

const auth = (req,res,next) =>{
    const token = req.header('Authorization');
    console.log('token',token)
    const bearerWord = token.split(" ")[0].trim();
    const bearerToken = token.split(" ")[1];
    
    
    if (bearerWord!= "Bearer"){
       return res.status(403).json({ message: 'Invalid Header'});
    } 
    if(!bearerToken){
       return res.status(401).json({message : 'No token, authorization denied'});   
    } 
    try {   
        const decoded = jwt.verify(bearerToken,process.env.Secret_Key);
        req.user = decoded;
        next(); 
    } catch (error) {
        res.status(401).json({message : 'token is not valid'});
    } 
};   


module.exports = { auth };

