var mongoose = require("mongoose");

let wishSchema = mongoose.Schema({
  title: String,
  img: String,
  desc: String,
});

let wishModel = mongoose.model("wishes", wishSchema);

module.exports = wishModel;
