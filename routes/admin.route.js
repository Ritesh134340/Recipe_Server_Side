const { Router } = require("express");
const admin = Router();
const authenticate = require("../middlewares/authentication");
const authorize = require("../middlewares/authorization");
const Chef = require("../models/chef.model");
const User = require("../models/user.model");
const Video = require("../models/video.model");

admin.get("/get/chef", async (req, res) => {
  const document = await Chef.find({});
  res.send({ document: document });
});

admin.post("/chef/id", async (req, res) => {
  const id = req.body.id;
  try {
    const document = await Chef.findOne({ _id: id });
    const videos = await Video.find({ chefId: id });
    res.send({ document: document, videos: videos });
  } catch (err) {
    console.log(err);
  }
});

admin.post("/create/chef", async (req, res) => {
  try {
    const check = await Chef.findOne({ channel: req.body.channel });

    if (check) {
      res.send({ mesg: "Channel Already Exists !" });
    } else {
      const newChef = new Chef(req.body);
      await newChef.save();
      res.send({ mesg: "Entry created successfully !" });
    }
  } catch (err) {
    console.log(err);
    res.send({ mesg: "Something went wrong, try later !" });
  }
});

admin.post("/create/video", async (req, res) => {
  try {
    const data = req.body;
    const check = await Video.findOne({
      videoId: data.videoId,
      chefId: data.chefId,
    });

    if(check) {
      res.status(409).send({ mesg: "Video already exists !" });
    } else {
      const newVideo = new Video(data);
      await newVideo.save();
      res.status(200).send({ mesg: "Video created successfully !" });
    }
  } catch (err) {
    res.status(500).send({ mesg: "Something went wrong !" });
  }
});

admin.get("/video/:id", async (req, res) => {
  try {
    const document = await Video.findOne({ _id: req.params.id });
    res.send({ document: document });
  } catch (err) {
    res.send({ mesg: "Something went wrong !" });
  }
});

admin.delete("/delete/video/:id", async (req, res) => {
  const videoId = req.params.id;
  try {
    await Video.findByIdAndDelete({ _id: videoId });
    res.status(200).send({ mesg: "Video deleted successfully !" });
  } catch (err) {
    res.status(500).send({ mesg: "Internal Server Error !" });
  }
});

admin.delete("/delete/user/:id", async (req, res) => {
  try {
    const deleteId = req.params.id;
    await User.findByIdAndDelete(deleteId);
    res.status(200).send({ mesg: "User deleted successfully !" });
  } catch (err) {
    res.status(500).send({ mesg: "Internal Server Error !" });
  }
});

admin.get("/getall/videos", async (req, res) => {
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

admin.get("/users", async (req, res) => {
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
