const Product = require("../models/Product");


const router = require("express").Router();
//GET ALL PRODUCTS
router.get("/", async (req, res) => {
 
  try {
    let products;

    
      products = await Product.find().limit(10);
    const data={
      status:{
        success:true,
        message:"product was successfully loaded"
      },
      "bannertop": {
        "image1": "https://images.unsplash.com/photo-15187955",

      },
      "vertical": products,
      "horizontal": products

    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
