const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  _id: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
});

module.exports = mongoose.model("video", videoSchema);
