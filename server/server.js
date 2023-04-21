const express = require("express");
const cors = require("cors");
const connectDB = require("./src/database/init.mongo");
const { appRoute, authRoute } = require("./src/routes/api");
console.log("ok");
require("dotenv").config();
const cookies = require("cookie-parser");
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
connectDB();
const port = process.env.PORT || 8080;
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookies());
appRoute(app);
authRoute(app);
app.listen(port, () => {
  console.log(`My app listening on port ${port}`);
});
