const { Response } = require("../config/constans");
const Book = require("../models/Book");
const Comment = require("../models/Comment");
const createComment = async (req, res) => {
  try {
    const { bookId, content, rate } = req.body;
    if (!bookId.trim() || !content.trim() || !rate || rate == 0)
      return res.status(Response.BAD_REQUEST).jsonp({
        success: false,
        message: "Missing data",
      });
    const userId = req.user.userId;
    const newComment = await Comment.create({
      bookId,
      content,
      userId,
      rate,
    });
    const book = await Book.findOne({ _id: bookId });
    await Book.updateOne(
      { _id: bookId },
      {
        total_vote: +book.total_vote + 1,
        total_points: +book.total_points + +rate,
      }
    );
    const { _doc } = await Comment.findOne({ _id: newComment._id });
    return res.status(Response.OK).jsonp({
      success: true,
      comment: {
        ..._doc,
        rate,
      },
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(Response.SERVICE_UNAVAILABLE).jsonp({
      success: false,
      message: "Invalid data",
    });
  }
};
const getComment = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id)
      return res.status(Response.BAD_REQUEST).jsonp({
        success: false,
        message: "Missing book id",
      });
    const comments = await Comment.find({ bookId: id });
    return res.status(Response.OK).jsonp({
      success: true,
      comments,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(Response.SERVICE_UNAVAILABLE).jsonp({
      success: false,
      message: "Server is error",
    });
  }
};

module.exports = {
  createComment,
  getComment,
};
