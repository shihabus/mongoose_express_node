const express = require("express");
const mongoose = require("mongoose");
const foodRouter = require("./routes/foodRoutes.js");
require("dotenv").config();

const app = express();
app.use(express.json()); // Make sure it comes back as json

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@postman.dyh9i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(foodRouter);

app.listen(3000, () => {
  console.log("Server is running...");
});
