const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true,rquired:true},
    gender:{type:String,required:true},
    image:String,
    role:{type:String,default:"user"},
    googleId:String,
    password:{type:String,require:true},
    favourite:[String]
})

const User=mongoose.model("user",userSchema);

module.exports=User;
