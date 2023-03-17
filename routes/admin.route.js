const { Router } = require("express");
const admin = Router();
const authenticate = require("../middlewares/authentication");
const authorize = require("../middlewares/authorization");
const Chef = require("../models/chef.model");
const User = require("../models/user.model");
const Video = require("../models/video.model");
const Home=require("../models/home.model");


admin.get("/home/data",async(req,res)=>{
    try{
      const homeData=await Home.findOne({})
      res.status(200).send({mesg:"Ok",homeData:homeData})
    }
    catch(err){
      console.log(err,"From Admin route")
     res.status(500).send({mesg:"Internal server error !"})
    }
   
})

admin.patch("/update/home/data",authenticate,authorize('admin'),async(req,res)=>{
   try{    
      
         const updateFields = {};
         
         if (req.body.text) {
           updateFields["carouselData.$.text"] = req.body.text;
         }
         if (req.body.image) {
           updateFields["carouselData.$.image"] = req.body.image;
         }


         await  Home.findOneAndUpdate(
          { "carouselData._id": req.body.imageId },
          { $set: updateFields })


         res.status(200).send({mesg:"Data updated successfully !"})
   }
   catch(err){
    console.log(err,"From Admin route")
    res.status(500).send({mesg:"Internal server error !"})
   }
})


admin.put("/add/carousel/data",authenticate,authorize('admin'),async(req,res)=>{
  try{    
         const newData={
          image:req.body.image,
          text:req.body.text
         }

         const check=await Home.findOne({_id:req.body.dataId,carouselData:{$elemMatch:{image:req.body.image}}})

        if(check){
          return   res.status(404).send({mesg:"Data already exists !"})
        }

         await Home.findOneAndUpdate({_id:req.body.dataId,$push:{carouselData:newData}})
         res.status(200).send({mesg:"Data added successfully !"})
  }
  catch(err){
   console.log(err,"From Admin route")
   res.status(500).send({mesg:"Internal server error !"})
  }
})


admin.delete("/delete/data/:objectId/image/:imageId",authenticate,authorize('admin'),async(req,res)=>{
  try{    
        
         await Home.findOneAndUpdate({_id:req.params.objectId,$pull:{carouselData:{_id:req.params.imageId}}})

         res.status(200).send({mesg:"Deleted successfully !"})
  }
  catch(err){
   console.log(err,"From Admin route")
   res.status(500).send({mesg:"Internal server error !"})
  }
})


admin.patch("/update/hero/image",authenticate,authorize('admin'),async(req,res)=>{
  try{    
         console.log("new home image") 
  }
  catch(err){
   console.log(err,"From Admin route")
   res.status(500).send({mesg:"Internal server error !"})
  }
})

admin.get("/get/chef",authenticate,authorize('admin'), async (req, res) => {
 try{
  const document = await Chef.find({});
  res.status(200).send({ document: document });
 }
 catch(err){
  console.log(err,"From Admin route")
  res.status(500).send({mesg:"Internal server error !"})
 }
  
});


admin.get("/chef/:id",authenticate,authorize('admin'),async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Chef.findOne({ _id: id });
    const videos = await Video.find({ chefId: id });
    res.status(200).send({ document: document, videos: videos });
  } catch (err) {
    console.log(err);
    res.status(500).send({mesg:"Internal server error !"})
  }
});



admin.post("/create/chef",authenticate,authorize('admin'), async (req, res) => {
  try {
    const check = await Chef.findOne({ channel: req.body.channel });

    if (check) {
      res.send({ mesg: "Channel Already Exists !" });
    } else {
      const newChef = new Chef(req.body);
      await newChef.save();
      res.send({ mesg: "Channel created successfully !" });
    }
  } catch (err) {
    console.log(err);
    res.send({ mesg: "Something went wrong, try later !" });
  }
});


admin.post("/create/video",authenticate,authorize('admin'), async (req, res) => {


  try {
    const data = req.body;
    const check = await Video.findOne({
      videoId: data.videoId,chefId:data.chefId
    });

    if (check) {
      res.status(409).send({ mesg: "Video already exists !" });
    } else {

    
      const newVideoData={
        chefId:data.chefId,
        channelId:data.channelId,
        channelLogo:data.channelLogo,
        postTime:data.postTime,
        postDate:data.postDate,
        chefName:data.chefName,
        channelName:data.channelName,
        time:data.time,
        videoId:data.videoId,
        title:data.title,
        description:data.description,
        thumbnails:data.thumbnails
      }
      const newVideo = new Video(newVideoData);
      await newVideo.save();
      res.status(200).send({ mesg: "Video created successfully !" });
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ mesg: "Something went wrong !" });
  }
});



admin.get("/video/:id",authenticate,authorize('admin'), async (req, res) => {
  try {
    const document = await Video.findOne({ _id: req.params.id });
    res.send({ document: document });
  } catch (err) {
    res.send({ mesg: "Something went wrong !" });
  }
});

admin.delete("/delete/video/:id",authenticate,authorize('admin'), async (req, res) => {
 
  const videoId = req.params.id;

  try {
    await Video.findByIdAndDelete({_id:videoId});
    res.status(200).send({ mesg: "Video deleted successfully !" });
  } catch (err) {
    console.log(err)
    res.status(500).send({ mesg: "Internal Server Error !" });
  }
});



admin.delete("/delete/user/:id",authenticate,authorize('admin'), async (req, res) => {
  try {
    
    const deleteId = req.params.id;
    await User.findByIdAndDelete(deleteId);
    res.status(200).send({ mesg: "User deleted successfully !" });
  } catch (err) {
    res.status(500).send({ mesg: "Internal Server Error !" });
  }
});

admin.get("/getall/videos",authenticate,authorize('admin'), async (req, res) => {

  try {
    let videoDocument = await Video.find();

    if (req.query.publishedAt) {
      const sortOrder = req.query.publishedAt === "asc" ? 1 : -1;
      videoDocument = await Video.find().sort({ createdAt: sortOrder }).exec();
    }

    res.status(200).send({ data: videoDocument });
  } catch (err) {
    res.status(500).send({ mesg: "Internal Server Error" });
  }
});

admin.get("/users",authenticate,authorize('admin') ,async (req, res) => {

  try {
    const userData = await User.find({});

    const newUserData =
      userData && userData.filter((ele) => ele.role !== "admin");

    res.status(200).send({ userDetails: newUserData });
  } catch (err) {
    console.log(err);
    res.status(500).send({ mesg: "Internal Server Error !" });
  }
});

module.exports = admin;
