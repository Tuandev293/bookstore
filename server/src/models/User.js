const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  refreshToken: { type: String, default: null },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", UserSchema);
