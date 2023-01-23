const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    image:String,
    googleId:String

})

const User=mongoose.model("gUser",userSchema);

module.exports=User;
