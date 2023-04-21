const { Response } = require("../config/constans");
const Book = require("../models/Book");
const calculateRating = require("../utils/calculateRating");

const getAllBook = async (req, res) => {
  try {
    const listBook = await Book.find().limit(31);
    return res.status(Response.OK).jsonp({
      message: "Get book success",
      books: {
        newBooks: listBook.slice(0, 10),
        hot: listBook.slice(10, 20),
        trend: listBook.slice(21, 31),
      },
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(Response.SERVICE_UNAVAILABLE).jsonp({
      message: "Error",
    });
  }
};

const searchBook = async (req, res) => {
  try {
    let { search } = req.query;
    if (!search) {
      return res.status(Response.OK).jsonp({
        success: true,
        books: [],
      });
    }
    const query = `${search.replace(/['"]+/g, "")}`;
    let re = new RegExp(query, "i");
    const books = await Book.find({ name: { $in: re } });
    return res.status(Response.OK).jsonp({
      success: true,
      message: `Good job`,
      books,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(Response.BAD_REQUEST).jsonp({
      success: false,
      message: "Missing data",
    });
  }
};
const getDetailBook = async (req, res) => {
  const { id } = req.query;
  try {
    if (!id)
      return res
        .status(Response.BAD_REQUEST)
        .json({ success: false, message: "Missing data" });
    const { _doc } = await Book.findOne({ _id: id });
    const rate = calculateRating(_doc.total_points, _doc.total_vote);
    return res.status(Response.OK).jsonp({
      success: true,
      message: "successfully",
      book: {
        ..._doc,
        rate: parseFloat(rate),
      },
    });
  } catch (err) {
    // console.error(err);
    res
      .status(Response.SERVICE_UNAVAILABLE)
      .json({ err: "Something went wrong" });
  }
};
const addBook = async (req, res) => {
  try {
    const { name, author, image, description } = req.body;
    const book = new Book({
      name,
      author,
      image,
      description,
    });
    const result = await book.save();
    return res.status(Response.OK).jsonp({
      success: true,
      message: "successfully",
      book: result,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(Response.BAD_REQUEST).jsonp({
      success: false,
      message: "Missing data",
    });
  }
};

module.exports = {
  getAllBook,
  getDetailBook,
  searchBook,
  addBook,
};
