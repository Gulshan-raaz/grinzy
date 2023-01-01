const Product = require("../models/Product");


const router = require("express").Router();
//GET ALL PRODUCTS
router.get("/", async (req, res) => {

  try {
    let products;


    products = await Product.find().limit(10);
    const hproduct = {"type": "vertical",
    data: products}
    const vproduct = {"type": "horizontal",
    data: products}
    const banner = {"type": "banner",
    data:{
      "image":"",
    }}
    const data = {
      
      status: {
        success: true,
        message: "product was successfully loaded"
      },


      data: [vproduct,hproduct,banner]
    }
       
       
        
      



    

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
