require("dotenv").config();
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.jtsugiw.mongodb.net/test`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("db connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
