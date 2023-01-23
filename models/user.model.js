const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true,rquired:true},
    image:String,
    role:{type:String,default:"user"},
    googleId:String,
    password:{type:String,require:true}

})

const User=mongoose.model("gUser",userSchema);

module.exports=User;
