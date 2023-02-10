const mongoose=require("mongoose");

const chefSchema=new mongoose.Schema({
   chefName:{type:String,required:true},
   channel:{type:String,required:true,unique:true},
   banner:{type:String} ,
   logo:{type:String}
})


const Chef=mongoose.model("chef",chefSchema)

module.exports=Chef;