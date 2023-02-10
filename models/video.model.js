const mongoose=require("mongoose");

const videoSchema=new mongoose.Schema({
    chefId:{type:String,required:true},
    channelId:String,
    channelLogo:{type:String,required:true},
    postTime:String,
    postDate:String,
    chefName:{type:String},
    channelName:{type:String},
    videoId:{type:String,required:true,unique:true},
    title:{type:String},
    description:{type:String},
    thumbnails:{type:String},
    publishedAt:{type:String},
    time:String
})

const Video=mongoose.model("video",videoSchema
)

module.exports=Video