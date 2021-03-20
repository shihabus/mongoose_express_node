const express = require("express");
const { ObjectId } = require("mongodb");
const foodCollection = require("../db").foodCollection;
const app = express();

app.get("/foods", async (req, res) => {
  const cursor = await foodCollection()
    .find({})
    .sort({ last_review: -1 })
    .limit(Number.MAX_SAFE_INTEGER);

  const foods = await cursor.toArray();

  try {
    res.send(foods);
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

app.post("/food", async (req, res) => {
  try {
    const result = await foodCollection().insertOne(req.body);
    res.status(201).send(`Food created with ID: ${result.insertedId}`);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/food/:id", async (req, res) => {
  try {
    const result = await foodCollection().deleteOne({
      _id: ObjectId(req.params.id),
    });

    if (!result.deletedCount) res.status(404).send("No item found");

    res.status(200).send(`Food with id ${req.params.id} deleted`);
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

app.patch("/food/:id", async (req, res) => {
  try {
    const result = await foodCollection().updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: req.body },
      { upsert: true }
    );

    res.send(`result.modifiedCount ${result.matchedCount}`);
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

module.exports = app;
