const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, trim: true },
  password: String,
  type: { type: Number, default: 3 }
});

let User = mongoose.model("user", UserSchema);

module.exports = User;