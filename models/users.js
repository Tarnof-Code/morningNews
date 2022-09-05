var mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "wishes" }],
});

let userModel = mongoose.model("users", userSchema);

module.exports = userModel;
