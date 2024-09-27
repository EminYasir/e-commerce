const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

//Ürün oluşturma
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Tüm ürünleri Getir
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

//single-product getirme
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

//product Güncelleme
router.put("/:productId", async (req, res) => {
  try {
    const update = req.body;
    const productId = req.params.productId;
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product is not found" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      existingProduct,
      update,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

//product delete
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const existingProduct = await Product.findByIdAndDelete(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product is not found" });
    }
    res
      .status(200)
      .json({ message: "Ürün başarı ile silindi", existingProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Ürünleri ismine göre 
router.get("/search/:productName",async (req,res)=>{
  try {
    const productName=req.params.productName;
    const prducts=await Product.find({
      name:{$regex:productName, $options:"i"}
    })
    res.status(200).json(prducts)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
})

module.exports = router;
