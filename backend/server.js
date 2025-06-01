const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const {connectdb} = require('./config/db');
const authRoute = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes')
const app = express();
const PORT = 5013;

app.use(express.json());
app.use(bodyParser.json());

connectdb();
app.use(cors());

app.use('/api/auth',authRoute);

app.use('/api/recipe',recipeRoutes);

app.use('/uploads', express.static('uploads'));

app.listen(PORT,()=>{
    console.log('Server Started at ',PORT);
}) 