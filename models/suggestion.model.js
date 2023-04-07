const mongoose=require("mongoose");

const suggestionSchema = new mongoose.Schema({
    id:String,
    title: String
  });
  
const mainSchema=new mongoose.Schema({
    data:[suggestionSchema]
});

const Suggestion=mongoose.model("suggestion",mainSchema);

module.exports=Suggestion