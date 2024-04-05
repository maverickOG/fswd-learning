const express = require("express");

const app = express();
const port = process.env.PUBLIC_PORT || 3000;

require("dotenv").config();
const mongoose = require("mongoose");
const mongodburi = process.env.MONGO_URI;

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

mongoose.connect(mongodburi);

app.get("/mongoDbConnection", (req, res) => {
  if (mongoose.connection.readyState == 1) {
    res.status(200).json("📦 MongoDB is connected");
  } else {
    res.status(400).json("❌ Error connecting to MongoDB");
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;
