const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;
console.log("simple0515------> process.env.PORT is:", PORT);
const MONGO_URI = "mongodb+srv://gracetzay123_db_user:v1bbs8y1U0o2P2jK@cluster0.pbivwkx.mongodb.net/test"
mongoose.connect(MONGO_URI )
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello from Render-deployed backend!");
});

app.get("/health", (req, res) => {
  res.json({ status: "health ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});