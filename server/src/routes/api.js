const express = require("express");
const route = express.Router();
const { login, register, connect } = require("../controller/authController");
const {
  getAllBook,
  getDetailBook,
  searchBook,
  addBook,
} = require("../controller/bookController");
const { verifyToken } = require("../middleware/authorization");
const {
  createComment,
  getComment,
} = require("../controller/commentController");

const appRoute = (app) => {
  route.get("/get-books", getAllBook);
  route.get("/detail-book", getDetailBook);
  route.get("/search", searchBook);
  route.post("/add-books", addBook);
  //comment
  route.post("/create-comment", verifyToken, createComment);
  route.get("/get-comments", getComment);

  return app.use("/api/v1", route);
};

const authRoute = (app) => {
  route.post("/login", login);
  route.post("/register", register);
  route.post("/connect", connect);
  return app.use("/api/auth", route);
};

module.exports = { appRoute, authRoute };
