const { Router } = require("express");
const app = Router();
const Chef = require("../models/chef.model");
const translate = require("translate");
const Video = require("../models/video.model");
const User = require("../models/user.model");
const authentication = require("../middlewares/authentication");
const Comment = require("../models/comment.model");
const Suggestion=require("../models/suggestion.model")

// const allSuggestions = [
//   { id: 1, title: 'paneer butter masala' },
//   { id: 2, title: 'paneer tikka masala' },
//   { id: 3, title: 'paneer makhani' },
//   { id: 4, title: 'paneer bhurji' },
//   { id: 5, title: 'palak paneer' },
//   { id: 6, title: 'kadhai paneer' },
//   { id: 7, title: 'paneer korma' },
//   { id: 8, title: 'paneer pasanda' },
//   { id: 9, title: 'shahi paneer' },
//   { id: 10, title: 'paneer pulao' },
//   { id: 11, title: 'ras malai' },
//   { id: 12, title: 'gulab jamun' },
//   { id: 13, title: 'rasmalai cake' },
//   { id: 14, title: 'barfi' },
//   { id: 15, title: 'kulfi' },
//   { id: 16, title: 'malai peda' },
//   { id: 17, title: 'rabri' },
//   { id: 18, title: 'kheer' },
//   { id: 19, title: 'rajma' },
//   { id: 20, title: 'chana masala' },
//   { id: 21, title: 'aloo gobi' },
//   { id: 22, title: 'daal makhani' },
//   { id: 23, title: 'samosa' },
//   { id: 24, title: 'tandoori chicken' },
//   { id: 25, title: 'butter chicken' },
//   { id: 26, title: 'chicken tikka masala' },
//   { id: 27, title: 'chicken korma' },
//   { id: 28, title: 'chicken biryani' },
//   { id: 29, title: 'chicken 65' },
//   { id: 30, title: 'chicken chilli' },
//   { id: 31, title: 'vada pav' },
//   { id: 32, title: 'pav bhaji' },
//   { id: 33, title: 'dabeli' },
//   { id: 34, title: 'samosa chaat' },
//   { id: 35, title: 'bhel puri' },
//   { id: 36, title: 'papdi chaat' },
//   { id: 37, title: 'panipuri' },
//   { id: 38, title: 'dahi puri' },
//   { id: 39, title: 'sev puri' },
//   { id: 40, title: 'misal pav' },
//   { id: 41, title: 'masala dosa' },
//   { id: 42, title: 'idli sambhar' },
//   { id: 43, title: 'medu vada' },
//   { id: 44, title: 'uttapam' },
//   { id: 45, title: 'upma' },
//   { id: 46, title: 'chhole bhature' },
//   { id: 47, title: 'kachori'},
//   { id: 48, title: 'tandoori chicken wings' },
// { id: 49, title: 'chicken biryani recipe' },
// { id: 50, title: 'chicken curry recipe' },
// { id: 51, title: 'chicken tikka masala' },
// { id: 52, title: 'chicken korma recipe' },
// { id: 53, title: 'mutton curry recipe' },
// { id: 54, title: 'mutton biryani recipe' },
// { id: 55, title: 'kebab recipe' },
// { id: 56, title: 'shami kebab recipe' },
// { id: 57, title: 'aloo tikki chaat recipe' },
// { id: 58, title: 'pav bhaji recipe' },
// { id: 59, title: 'vada pav recipe' },
// { id: 60, title: 'chana masala recipe' },
// { id: 61, title: 'rajma masala recipe' },
// { id: 62, title: 'dal makhani recipe' },
// { id: 63, title: 'palak paneer recipe' },
// { id: 64, title: 'paneer butter masala recipe' },
// { id: 65, title: 'paneer tikka recipe' },
// { id: 66, title: 'paneer makhani recipe' },
// { id: 67, title: 'shahi paneer recipe' },
// { id: 68, title: 'paneer bhurji recipe' },
// { id: 69, title: 'gulab jamun recipe' },
// { id: 70, title: 'rasgulla recipe' },
// { id: 71, title: 'rasmalai recipe' },
// { id: 72, title: 'gajar ka halwa recipe' },
// { id: 73, title: 'kheer recipe' },
// { id: 74, title: 'rabri recipe' },
// { id: 75, title: 'kulfi recipe' },
// { id: 76, title: 'mango kulfi recipe' },
// { id: 77, title: 'mixed veg recipe' },
// { id: 78, title: 'baingan bharta recipe' },
// { id: 79, title: 'bhindi masala recipe' },
// { id: 80, title: 'aloo gobi recipe' },
// { id: 81, title: 'aloo matar recipe' },
// { id: 82, title: 'bhindi fry recipe' },
// { id: 83, title: 'mushroom curry recipe' },
// { id: 84, title: 'mushroom masala recipe' },
// { id: 85, title: 'dum aloo recipe' },
// { id: 86, title: 'rajasthani gatte ki sabzi recipe' },
// { id: 87, title: 'paneer kofta recipe' },
// { id: 88, title: 'paneer pakora recipe' },
// {
// "id": 89,
// "title": "chicken biryani",
// },
// {
// "id": 90,
// "title": "chicken keema",
// },
// {
// "id": 91,
// "title": "mutton curry",
// },
// {
// "id": 92,
// "title": "egg masala",
// },
// {
// "id": 93,
// "title": "fish curry",
// },
// {
// "id": 94,
// "title": "tandoori chicken",
// },
// {
// "id": 95,
// "title": "mutton biryani",
// },
// {
// "id": 96,
// "title": "chicken korma",
// },
// {
// "id": 97,
// "title": "chicken tikka masala",
// },
// {
// "id": 98,
// "title": "mutton rogan josh",
// },
// {
// "id": 99,
// "title": "chicken vindaloo",
// },
// {
// "id": 100,
// "title": "egg bhurji",
// },
// {
// "id": 101,
// "title": "mutton keema",
// },
// {
// "id": 102,
// "title": "chicken chettinad",
// },
// {
// "id": 103,
// "title": "chicken fry",
// },
// {
// "id": 104,
// "title": "prawn curry",
// },
// {
// "id": 105,
// "title": "fish fry",
// },
// {
// "id": 106,
// "title": "chicken lollipop",
// },
// {
// "id": 107,
// "title": "mutton korma",
// },
// {
// "id": 108,
// "title": "chicken malai tikka",
// },
// {
// "id": 109,
// "title": "chicken curry",
// },
// {
// "id": 110,
// "title": "chicken 65",
// },
// {
// "id": 111,
// "title": "mutton fry",
// },
// {
// "id": 112,
// "title": "egg curry",
// },
// {
// "id": 113,
// "title": "prawn biryani",
// },
// {
// "id": 114,
// "title": "mutton do pyaza",
// },
// {
// "id": 115,
// "title": "chicken reshmi kebab",
// },
// {
// "id": 116,
// "title": "chicken handi",
// },
// {
// "id": 117,
// "title": "mutton kadai",
// },
// {
// "id": 118,
// "title": "chicken saagwala",
// },
// {
// "id": 119,
// "title": "chicken chaap",
// },
// {
// "id": 120,
// "title": "fish tikka",
// },
// {
// "id": 121,
// "title": "mutton kebab",
// },
// {
// "id": 122,
// "title": "chicken tandoori",
// },
// {
// "id": 123,
// "title": "chicken haleem",
// },
// {
// id: 124,
// title: "masala paneer paratha"
// },
// {
// id: 125,
// title: "gajar ka halwa"
// },
// {
// id: 126,
// title: "chana masala"
// },
// {
// id: 127,
// title: "keema aloo"
// },
// {
// id: 128,
// title: "pav bhaji"
// },
// {
// id: 129,
// title: "rajma chawal"
// },
// {
// id: 130,
// title: "paneer pulao"
// },
// {
// id: 131,
// title: "jeera rice"
// },
// {
// id: 132,
// title: "aloo gobi"
// },
// {
// id: 133,
// title: "palak paneer"
// },
// {
// id: 134,
// title: "chicken biryani recipe",
// },
// {
// id: 135,
// title: "cheese balls recipe",
// },
// {
// id: 136,
// title: "chicken shawarma recipe",
// },
// {
// id: 137,
// title: "rajma masala recipe",
// },
// {
// id: 138,
// title: "vegetable biryani recipe",
// },
// {
// id: 139,
// title: "chicken curry recipe",
// },
// {
// id: 140,
// title: "chicken 65 recipe",
// },
// {
// id: 141,
// title: "gobi manchurian recipe",
// },
// {
// id: 142,
// title: "samosa recipe",
// },
// {
// id: 143,
// title: "chicken tikka recipe",
// },
// {
// id: 144,
// title: "matar paneer recipe",
// },
// {
// id: 145,
// title: "fruit salad recipe",
// },
// {
// id: 146,
// title: "dal makhani recipe",
// },
// {
// id: 147,
// title: "rava dosa recipe",
// },
// {
// id: 148,
// title: "paneer pakora recipe",
// },
// {
// id: 149,
// title: "pav bhaji recipe",
// },
// {
// id: 150,
// title: "aloo paratha recipe",
// },
// {
// id: 151,
// title: "veg biryani recipe",
// },
// {
// id: 152,
// title: "dum aloo recipe",
// },
// {
// id: 153,
// title: "chicken korma recipe",
// },
// {
// id: 154,
// title: "chicken popcorn recipe",
// },
// {
// id: 155,
// title: "dal fry recipe",
// },
// {
// id: 156,
// title: "vada pav recipe",
// },
// {
// id: 157,
// title: "jeera rice recipe",
// },
// {
// id: 158,
// title: "gulab jamun recipe",
// },
// {
// id: 159,
// title: "tandoori chicken recipe",
// },
// {
// id: 160,
// title: "papdi chaat recipe",
// },
// {
// id: 161,
// title: "bhindi masala recipe",
// },
// {
// id: 162,
// title: "vegetable sandwich recipe",
// },
// {
// id: 163,
// title: "chicken roast recipe",
// },
// {
// id: 164,
// title: "chicken hakka noodles recipe",
// },
// {
// id: 165,
// title: "chana masala recipe",
// },
// {
// id: 166,
// title: "aloo gobi recipe",
// },
// {
// id: 167,
// title: "raj kachori recipe",
// },
// {
// id: 168,
// title: "egg curry recipe",
// },
// {
// id: 169,
// title: "aloo tikki recipe",
// },
// {
// id: 170,
// title: "mushroom masala recipe",
// },
// {
// id: 171,
// title: "veg pulao recipe",
// },
// {
// id: 172,
// title: "chicken biryani hyderabadi recipe",
// },
// {
// id: 173,
// title: "dahi bhalla recipe",
// },
// {
// id: 174,
// title: "chicken momos recipe",
// },
// {
// id: 174,
// title: "mutton korma",
// },
// {
// id: 175,
// title: "mutton do pyaza",
// },
// {
// id: 176,
// title: "mutton curry",
// },
// {
// id: 177,
// title: "chicken biryani",
// },
// {
// id: 178,
// title: "chicken tikka masala",
// },
// {
// id: 179,
// title: "chicken tandoori",
// },
// {
// id: 180,
// title: "chicken keema",
// },
// {
// id: 181,
// title: "paneer pakora",
// },
// {
// id: 182,
// title: "veg momos",
// },
// {
// id: 183,
// title: "veg spring roll",
// },
// {
// id: 184,
// title: "pav bhaji",
// },
// {
// id: 185,
// title: "vada pav",
// },
// {
// id: 186,
// title: "masala dosa",
// },
// {
// id: 187,
// title: "idli sambhar",
// },
// {
// id: 188,
// title: "dahi puri",
// },
// {
// id: 189,
// title: "aloo tikki",
// },
// {
// id: 190,
// title: "sev puri",
// },
// {
// id: 191,
// title: "papdi chaat",
// },
// {
// id: 192,
// title: "chana masala",
// },
// {
// id: 193,
// title: "matar paneer",
// },
// {
// id: 194,
// title: "aloo gobi",
// },
// {
// id: 195,
// title: "palak paneer",
// },
// {
// id: 196,
// title: "butter chicken",
// },
// {
// id: 197,
// title: "chicken korma",
// },
// {
// id: 198,
// title: "chicken do pyaza",
// },
// {
// id: 199,
// title: "chicken curry",
// },
// {
// id: 200,
// title: "chicken biryani",
// },
// {
// id: 201,
// title: "chicken tikka masala",
// },
// {
// id: 202,
// title: "chicken tandoori",
// },
// {
// id: 203,
// title: "chicken keema",
// },
// {
// id: 204,
// title: "paneer pakora",
// },
// {
// id: 205,
// title: "veg momos",
// },
// {
// id: 206,
// title: "veg spring roll",
// },
// {
// id: 207,
// title: "pav bhaji",
// },
// {
// id: 208,
// title: "vada pav",
// },
// {
// id: 209,
// title: "masala dosa",
// },
// {
// id: 210,
// title: "idli sambhar",
// },
// {
// id: 211,
// title: "dahi puri",
// },
// {
// id: 212,
// title: "aloo tikki",
// },
// {
// id: 213,
// title: "sev puri",
// },
// {
// id: 214,
// title: "papdi chaat",
// },
// {
// id: 215,
// title: "chana masala",
// }
// ];



app.get("/get/chef", async (req, res) => {
  try {
   

    const document = await Chef.find({});

    res.status(200).send({ document: document });
  } catch (err) {
    console.log(err, "From App route");
    res.status(500).send({ mesg: "Internal server error !" });
  }
});

app.get("/getall/videos", async (req, res) => {

  try {
    const suggDoc=await Suggestion.findOne({})

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
    res.status(200).send({ data: videoDocument,suggestions:suggDoc.data });
  } catch (err) {
    res.status(500).send({ mesg: "Internal Server Error" });
  }
});

app.get("/get/video/:id", async (req, res) => {
  try {
    const document = await Video.findOne({ _id: req.params.id });

    const commentsDocument = await Comment.findOne({ videoId: req.params.id });
    let comments = commentsDocument ? commentsDocument : {};

    res.status(200).send({ document: document, comments: comments });
  } catch (err) {
    res.status(500).send({ mesg: "Internal server error !" });
  }
});

app.post("/rate/video", authentication, async (req, res) => {
  const { videoId, rating, id } = req.body;

  try {
    async function addRating() {
      let sum = 0;

      const videoDocument = await Video.findOne({ _id: videoId });

      for (let i = 0; i < videoDocument.ratedBy.length; i++) {
        sum += Number(videoDocument.ratedBy[i].userRating);
      }

      const avgRating = sum / videoDocument.ratedBy.length;

      return avgRating.toFixed(2);
    }

    const check = await Video.findOne({
      _id: videoId,
      ratedBy: { $elemMatch: { userId: id } },
    });

    if (!check) {
      const pushObject = { userRating: rating, userId: id };

      await Video.findOneAndUpdate(
        { _id: videoId },
        { $push: { ratedBy: pushObject } }
      );

      const newRating = await addRating();
      await Video.findOneAndUpdate({ _id: videoId }, { rating: newRating });

      res.status(200).send({ mesg: "Thanks for rating !" });
    } else {
      const filter = { _id: videoId, "ratedBy.userId": id };
      const update = { $set: { "ratedBy.$.userRating": rating } };

      await Video.findOneAndUpdate(filter, update);

      const newRating = await addRating();

      await Video.findOneAndUpdate({ _id: videoId }, { rating: newRating });

      res.status(200).send({ mesg: "Rating updated successfully !" });
    }
  } catch (err) {
    console.log(err, "Error from App route rating");
    res.status(500).send({ mesg: "Internal server error !" });
  }
});

app.patch("/add/favourite", authentication, async (req, res) => {
  const videoId = req.body.videoId;
  const userEmail = req.body.userEmail;

  const check = await User.findOne({
    email: userEmail,
    favourite: { $in: [videoId] },
  });

  if (check) {
    return res
      .status(409)
      .send({ mesg: "Video already exists in your favourite list !" });
  }
  try {
    await User.findOneAndUpdate(
      { email: userEmail },
      { $push: { favourite: videoId } }
    );

    res.status(200).send({ mesg: "Added to favourite !" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ mesg: "Internal server error !" });
  }
});

app.get("/get/favourite", authentication, async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    const favouriteVideos = await Video.find({
      _id: { $in: findUser.favourite },
    });
    res.status(200).send({ favourite: favouriteVideos });
  } catch (err) {
    res.status(500).send({ mesg: "Internal server error !" });
  }
});

app.delete("/delete/favourite/:id", authentication, async (req, res) => {
  try {
    const userEmail = req.body.email;
    const videoId = req.params.id;
    await User.findOneAndUpdate(
      { email: userEmail },
      { $pull: { favourite: videoId } }
    );

    const findUser = await User.findOne({ email: userEmail });

    const favouriteVideos = await Video.find({
      _id: { $in: findUser.favourite },
    });
    res
      .status(200)
      .send({ mesg: "Removed from favourite !", updatedList: favouriteVideos });
  } catch (err) {
    res.status(500).send({ mesg: "Internal server error !" });
  }
});

app.get("/search", async (req, res) => {
   
 let englishText = req.query.q;
 
 const check=await Suggestion.findOne({ 'data.title': englishText })

 if(!check){
  await Suggestion.updateOne({ 'data.title': { $ne: englishText.toLowerCase() } }, { $push: { data: { title: englishText.toLowerCase() } } })
 
 }
 





  translate.engine = "google";
  translate.from = "en";
  translate.to = "hi";
  

  let newEnglishText=englishText;
  let englishRegexKeywords = new RegExp(newEnglishText, "i");


  let modifyEnglish=englishText;
 
  let text= await  translate(modifyEnglish);

  let hindiRegexKeywords = new RegExp(text, "i");


  try {
   let  searchResult = await Video.find({
      $or: [{ title: { $in: [hindiRegexKeywords,englishRegexKeywords] } }],
    });

    res.status(200).send({ searchResult: searchResult });
  } catch (err) {
    console.log("Error is from search result :",err)
    res.status(500).send({ mesg: "Internal server error !" });
  }
});

app.get("/chef/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Chef.findOne({ _id: id });
    const videos = await Video.find({ chefId: id });
    res.status(200).send({ document: document, videos: videos });
  } catch (err) {
    console.log(err);
    res.status(500).send({ mesg: "Internal server error !" });
  }
});

app.delete(
  "/video/:videoId/comment/:commentId",
  authentication,
  async (req, res) => {
    let videoId = req.params.videoId;
    let commentId = req.params.commentId;

    try {
      await Comment.updateOne(
        { videoId: videoId },
        { $pull: { comment: { commentId: commentId } } }
      );

      const commentsDocument = await Comment.findOne({ videoId: videoId });

      let comments = commentsDocument ? commentsDocument : {};

      res
        .status(200)
        .send({ mesg: "Comment deleted successfully !", comments: comments });
    } catch (err) {
      console.log(err);
      res.status(500).send({ mesg: "Internal server error!" });
    }
  }
);

app.post("/add/comment", authentication, async (req, res) => {
  const { videoId, name, image, comment, id, email, commentId } = req.body;

  try {
    const check = await Comment.findOne({ videoId: videoId });

    if (check) {
      let postTime = Date.now();
      const commentObj = {
        userId: id,
        userImage: image,
        userComment: comment,
        userName: name,
        postedAt: postTime,
        userEmail: email,
        likedBy: [],
        dislikedBy: [],
        commentId: commentId,
      };

      await Comment.findOneAndUpdate(
        { videoId: videoId },
        { $push: { comment: commentObj } }
      );

      const commentsDocument = await Comment.findOne({ videoId: videoId });

      let comments = commentsDocument ? commentsDocument : {};

      res
        .status(200)
        .send({ mesg: "Comment added successfully !", comments: comments });
    } else {
      let postTime = Date.now();
      const commentObj = {
        userId: id,
        userImage: image,
        userComment: comment,
        userName: name,
        postedAt: postTime,
        userEmail: email,
        likedBy: [],
        dislikedBy: [],
        commentId: commentId,
      };

      const newComment = new Comment({
        videoId: videoId,
      });

      await newComment.save();

      await Comment.findOneAndUpdate(
        { videoId: videoId },
        { $push: { comment: commentObj } }
      );

      const commentsDocument = await Comment.findOne({ videoId: videoId });

      let comments = commentsDocument ? commentsDocument : {};

      res
        .status(200)
        .send({ mesg: "Comment added successfully !", comments: comments });
    }
  } catch (err) {
    console.log(err, "Error from add comment !");
    res.status(500).send("Internal server error !");
  }
});

module.exports = app;
