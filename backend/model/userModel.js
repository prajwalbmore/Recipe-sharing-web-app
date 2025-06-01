const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
    permission:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
})

//Hash password 
userSchema.pre('save',async function (next){
    
    const user = this;
    if(user,this.isModified('password')){
        user.password = await bcrypt.hash(this.password, 8);
    } 
    next();
});

userSchema.methods.comparePassword = async function (password){ 
    return await bcrypt.compare(password, this.password);
};  

module.exports = mongoose.model('User',userSchema);