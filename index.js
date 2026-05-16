const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Product = require("./models/product");

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

// HTTP GET
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    const str1 = "Products fetched successfully";
    console.log("--->>>", str1);
    console.log(products);

    res.json({
      message: str1,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
});

app.get("/products/:sku", async (req, res) => {
  try{
    const sku = await Product.findOne();
    if (!sku) {
      return res.status(400).json({error: "product not found"});
    }
    return res.status(200).json(sku);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch a product",
    });
  }
});

// HTTP POST - ADD PRODUCT
// curl -X POST http://DOMAIN:PORT/add_product -H "Content-Type: application/json" -d '{"name":"ginger", "sku":"sku202","qty":10}'
app.post("/add_product", async (req, res) => {
  try{
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
      console.error(error);
      res.status(500).json({
      error: "Failed to add a product",
    });
  }
});
// HTTP PUT

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
