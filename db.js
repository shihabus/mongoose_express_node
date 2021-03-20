const { MongoClient } = require("mongodb");
require("dotenv").config();

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@postman.dyh9i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  try {
    await client.connect();
    console.log("Db connection success");
  } catch (e) {
    console.error("Error in connect DB", e);
  }
}

const connect = () => main().catch(console.error);
const foodCollection = () =>
  client.db("sample_foods").collection("foodCollection");

module.exports = {
  foodCollection,
  connect,
};
