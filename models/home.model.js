const mongoose = require("mongoose");

const carouselDataSchema = mongoose.Schema({
  image: { type: String },
  text: { type: String },
});

const homeSchema = mongoose.Schema({
  heroImage: String,
  heroText: String,
  carouselData: [carouselDataSchema],
});

const Home = mongoose.model("home", homeSchema);

module.exports = Home;
