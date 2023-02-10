const {Router} = require("express")
const app=Router();
const Video=require("../models/video.model")


app.get("/getall/videos",async(req,res)=>{
    try{
       
        const queryObj={}
        const {publishedAt}=req.query;
      
        const videoDocument=await  Video.find(queryObj)


        if(publishedAt){
          let order;
          if(publishedAt==="asc"){
            order=-1;
            videoDocument.sort({publishedAt:order})
          }
          if(publishedAt==="desc"){
            order=1;
            videoDocument.sort({publishedAt:order})
          }
        }
         res.status(200).send({data:videoDocument})
      }
      catch(err){
        res.status(500).send({mesg:"Internal Server Error"})
      }
})



module.exports=app

