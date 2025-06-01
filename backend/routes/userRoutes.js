const express = require('express')
const userController = require('../controller/userController')
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/register',userController.register);
//http://localhost:5013/api/auth/register 

router.post('/login',userController.login);
//http://localhost:5013/api/auth/login

router.get('/getAllUsers',auth,userController.getAllUsers)
//http://localhost:5013/api/auth/getAllUsers

router.get('/userInfo',auth,userController.userInformation);
//http://localhost:5013/api/auth/userInfo

module.exports = router;