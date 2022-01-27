const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(bodyParser.json());

//Import routes
const tarkovammo = require("./routes/tarkovammo");
const userRoutes = require("./routes/user");
app.use("/tarkovammo", tarkovammo);
app.use("/user", userRoutes);
//Routes
app.get("/", (req, res) => {
  res.send("Homepage");
});
//body parser
app.use(bodyParser.json);
//Connect to db
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("Connected to DB")
);
//Listen to the server
app.listen(3000);
module.exports = app;
