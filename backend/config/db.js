const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function connectdb(){
    try {
        await mongoose.connect(process.env.DB_Url);
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.log("Error in Connection",error);
    }
}
module.exports  = { connectdb };