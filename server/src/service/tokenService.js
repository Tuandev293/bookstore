const jwt = require("jsonwebtoken");
const User = require("../models/User");
const createAccessToken = (payload) => {
  return jwt.sign(
    { userId: payload._id, isAdmin: payload.isAdmin },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

const createRefreshToken = (payload) => {
  return jwt.sign({ userId: payload._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "2d",
  });
};
const updateToken = async (payload, refreshToken) => {
  await User.updateOne({ _id: payload._id }, { $set: { refreshToken } });
};
module.exports = {
  createAccessToken,
  createRefreshToken,
  updateToken,
};
