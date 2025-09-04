// backend/server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Product list with image URLs from Unsplash
const products = [
  {
    id: 1,
    title: "Stylish Backpack",
    price: 1200,
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
  },
  {
    id: 2,
    title: "Gaming Mouse",
    price: 799,
    image: "https://images.unsplash.com/photo-1587202372775-98926bbcf6d0",
  },
  {
    id: 3,
    title: "Wireless Headphones",
    price: 1999,
    image: "https://images.unsplash.com/photo-1585386959984-a41552231693",
  },
  {
    id: 4,
    title: "Smart Watch",
    price: 2499,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
  },
  {
    id: 5,
    title: "Running Shoes",
    price: 2999,
    image: "https://images.unsplash.com/photo-1528701800489-20be3c3fcb3d",
  },
  {
    id: 6,
    title: "Laptop",
    price: 55000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
  {
    id: 7,
    title: "Coffee Mug",
    price: 399,
    image: "https://images.unsplash.com/photo-1526401485004-2aa7a4b3bb3f",
  },
  {
    id: 8,
    title: "Office Chair",
    price: 8999,
    image: "https://images.unsplash.com/photo-1616628182509-6bbef43ac1e4",
  },
];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});
