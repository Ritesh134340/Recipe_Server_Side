const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  videoId: String,
  comment: [Object],
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
