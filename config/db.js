const mongoose=require("mongoose");


mongoose.set('strictQuery', 
true);

const connection=mongoose.connect("mongodb+srv://passport:passport@cluster0.dyxlyd6.mongodb.net/?retryWrites=true&w=majority")



module.exports=connection