const { Response } = require("../config/constans");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res
      .status(Response.BAD_REQUEST)
      .json({ message: "access token invalid" });
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(Response.BAD_REQUEST).jsonp({
      success: false,
      message: "invalid signature",
    });
  }
};

module.exports = { verifyToken };
