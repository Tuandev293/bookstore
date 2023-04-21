const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1508812369462-520971343b10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
  },
  description: { type: String, required: true },
  total_points: { type: Number, default: 0 },
  total_vote: { type: Number, default: 0 },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Books", BookSchema);
