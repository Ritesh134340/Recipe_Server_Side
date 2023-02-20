const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true,rquired:true},
    gender:{type:String,default:"male"},
    image:String,
    role:{type:String,default:"user"},
    googleId:String,
    facebookId:String,
    password:{type:String,require:true},
    favourite:[String],
    otp:{type:String,default:""}
})

const User=mongoose.model("user",userSchema);

module.exports=User;
