const Product = require("../models/Product");


const router = require("express").Router();
//GET ALL PRODUCTS
router.get("/", async (req, res) => {

  try {
    const versionCode = req.headers['version_code'];
    let product;
    


    product = await Product.find().limit(10);
    const hproduct = {"type": "horizontal",
    "title": "Daily Usage",
    data: product}
    
    const banner = {"type": "banner",
    "title":"Sponser",
    data:{
      "image":"",
    }}

    const version = {
    
      "versionCode":"7",
      "status":versionCode <= 8 ? true : false,
    }

    const categories = await Product.distinct("categories").exec();
    
    
    const randomCategories = categories.sort(() => Math.random() - 0.5).slice(0, 5);
    
    let products = [];
    for (let category of randomCategories) {
      console.log(category)
        const randomProducts = await Product.aggregate([
            { $match: { categories: category } },
            { $sample: { size: 10} }
        ]).exec();
       
        products = [...products, ...randomProducts];
    }

    console.log(products);
    const vproduct = {"type": "vertical",
    "title":"Most popular",
    data: products}
    const data = {
      
      status: {
        success: true,
        message: "product was successfully loaded"
      },


      data:[version,hproduct,vproduct,banner]
    }
       
       
        
      



    

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
