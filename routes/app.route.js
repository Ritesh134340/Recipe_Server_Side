const { Router } = require("express");
const app = Router();
const Video = require("../models/video.model");
const User = require("../models/user.model");
const authentication = require("../middlewares/authentication");

app.get("/getall/videos", async (req, res) => {
  try {
    const queryObj = {};
    const { publishedAt } = req.query;

    const videoDocument = await Video.find(queryObj);

    if (publishedAt) {
      let order;
      if (publishedAt === "asc") {
        order = -1;
        videoDocument.sort({ publishedAt: order });
      }
      if (publishedAt === "desc") {
        order = 1;
        videoDocument.sort({ publishedAt: order });
      }
    }
    res.status(200).send({ data: videoDocument });
  } catch (err) {
    res.status(500).send({ mesg: "Internal Server Error" });
  }
});

app.get("/get/video/:id", async (req, res) => {
  try {
    const document = await Video.findOne({ _id: req.params.id });
    res.status(200).send({ document: document });
  } catch (err) {
    res.status(500).send({ mesg: "Internal server error !" });
  }
});

app.patch("/add/favourite", async (req, res) => {
  const videoId = req.body.videoId;
  const userEmail = req.body.userEmail;

  const check = await User.findOne({
    email: userEmail,
    favourite: { $in: [videoId] },
  });

  
  if (check) {
    return res
      .status(409)
      .send({mesg:"Video already exists in your favourite list !"});
  }
  try {
    await User.findOneAndUpdate(
      { email: userEmail },
      { $push: { favourite: videoId } }
    );

    res.status(200).send({ mesg: "Added to favourite !" });
  } catch (err) {
    console.log(err);
    res.status(500).send({mesg:"Internal server error !"});
  }
});



app.get("/get/favourite",authentication,async(req,res)=>{
  try{
    const findUser=await User.findOne({ email: req.body.email })
    const favouriteVideos=await Video.find({ _id: { $in: findUser.favourite } }) 
       res.status(200).send({favourite:favouriteVideos})
  }
  catch(err){
    res.status(500).send({mesg:"Internal server error !"})
  }   
 })


 app.delete("/delete/favourite/:id",authentication,async(req,res)=>{
 
    try{
      const userEmail=req.body.email;
      const videoId=req.params.id
      await User.findOneAndUpdate(
        { email:userEmail}, { $pull: { favourite:videoId }}
      );

      const findUser=await User.findOne({email:userEmail});
  
      const favouriteVideos=await Video.find({ _id: { $in: findUser.favourite } }) 
      res.status(200).send({mesg:"Removed from favourite !",updatedList:favouriteVideos})
    }
    catch(err){
       res.status(500).send({mesg:"Internal server error !"})
    }
 })

module.exports = app;
