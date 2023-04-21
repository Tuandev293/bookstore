const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "books",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  content: String,
  rate: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
CommentSchema.pre("findOne", function (next) {
  this.populate({
    path: "userId",
    select: "username avatar",
  });
  next();
}).pre("find", function (next) {
  this.populate({
    path: "userId",
    select: "username avatar",
  });
  next();
});
module.exports = mongoose.model("Comments", CommentSchema);
