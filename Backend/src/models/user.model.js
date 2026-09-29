const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, "username already taken"],
  },
  email: {
    type: String,
    unique: [true, "Account already exists with this email address"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const userModel = model("users", userSchema)
module.exports = userModel
