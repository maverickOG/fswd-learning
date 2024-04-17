const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const port = process.env.PUBLIC_PORT || 3000;

require("dotenv").config();
const mongoose = require("mongoose");
const mongodburi = process.env.MONGO_URI;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

mongoose.connect(mongodburi);
.then(() => {console.log("Database Connected")})
.catch((err) => {console.log(err)})

app.get("/mongoDbConnection", (req, res) => {
  if (mongoose.connection.readyState == 1) {
    res.status(200).json("📦 MongoDB is connected");
  } else {
    res.status(400).json("❌ Error connecting to MongoDB");
  }
});

// Mount the routes from routes.js
app.use("/api", routes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;
