const express = require("express");
const foodRouter = require("./routes/foodRoutes.js");
require("dotenv").config();

const connect = require("./db").connect;

connect();

const app = express();
app.use(express.json()); // Make sure it comes back as json

app.use(foodRouter);

app.listen(3000, () => {
  console.log("Server is running...");
});
