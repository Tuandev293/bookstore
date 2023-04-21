const { Response } = require("../config/constans");
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const SecondTwoDay = 172800;
const {
  createAccessToken,
  createRefreshToken,
  updateToken,
} = require("../service/tokenService");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).jsonp({
      success: false,
      message: "Missing username and/or password",
    });
  }
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(Response.UNAUTHORIZED)
        .jsonp({ success: false, message: "Incorrect username or password" });
    const passwordValid = await argon2.verify(user.password, password);

    if (!passwordValid)
      return res
        .status(Response.UNAUTHORIZED)
        .jsonp({ success: false, message: "Incorrect username or password" });

    const refreshToken = createRefreshToken(user);
    const accessToken = createAccessToken(user);
    updateToken(user, refreshToken);
    const currentUser = {
      username: user.username,
      id: user._id,
      isAdmin: user.isAdmin,
    };
    res.cookie("ref", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    return res.status(Response.OK).jsonp({
      ...currentUser,
      accessToken,
    });
  } catch (error) {
    return res.status(Response.INTERNAL_SERVER_ERROR).jsonp({
      status: false,
      message: "Server error",
    });
  }
};

const register = async (req, res) => {
  const { password, username } = req.body;
  if (!password?.trim() || !username?.trim())
    return res.status(Response.BAD_REQUEST).jsonp({
      status: false,
      message: "Missing username and/or password",
    });
  try {
    const user = await User.findOne({ username });
    if (user)
      return res.status(Response.UNPROCESSABLE).jsonp({
        status: true,
        message: "Username already",
      });
    const passHash = await argon2.hash(password);
    const newUser = await User.create({ username, password: passHash });
    const refreshToken = createRefreshToken(newUser);
    const accessToken = createAccessToken(newUser);
    updateToken(newUser, refreshToken);
    const currentUser = {
      username: newUser.username,
      id: newUser._id,
      isAdmin: newUser.isAdmin,
    };
    res.cookie("ref", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    return res.status(Response.OK).jsonp({
      ...currentUser,
      accessToken,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(Response.INTERNAL_SERVER_ERROR).jsonp({
      status: false,
      message: "Server error",
    });
  }
};

const logOut = async (req, res) => {
  res.clearCookie("ref");
  return res.status(Response.OK).jsonp({
    success: true,
    message: "User logged out",
  });
};

const connect = async (req, res) => {
  try {
    const refreshToken = await req.body.token;
    if (!refreshToken) {
      return res.status(Response.OK).jsonp({
        success: true,
        message: "User not login",
      });
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findOne({
      $or: [{ _id: decoded.userId }, { refreshToken }],
    });
    const accessToken = createAccessToken(user);
    return res.status(Response.OK).jsonp({
      username: user.username,
      id: user._id,
      isAdmin: user.isAdmin,
      accessToken,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(Response.OK).jsonp({
      success: false,
      message: "User not login",
    });
  }
};
module.exports = {
  login,
  connect,
  register,
};
