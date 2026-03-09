const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  feedbackuser: {
    type: String,
    required: true
  },
  message: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("FeedBackMsg", messageSchema);