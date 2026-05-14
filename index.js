const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const product = require("./models/product");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'not in the .env file'
console.log("simple0515------> process.env.PORT is:", PORT);

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI )
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello from Render-deployed backend!");
});

app.get("/health", (req, res) => {
  res.json({ status: "health ok" });
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.join(produts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
