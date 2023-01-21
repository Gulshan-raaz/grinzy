const Order = require("../models/Order");
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { userDetails } = require("../services/userDetail")

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  let newOrder = new Order(req.body);
  const userData = await userDetails(req.headers);

  console.log(userData);
  const orders = await Order.find();
  // console.log();
  let address = []
  address["address"] = userData.business_Address
  address["userId"] = userData._id
  address["orderid"] = orders.length + 1
  address["otp"] = Math.floor(Math.random() * 10000);

  console.log(address);

  newOrder = Object.assign(newOrder, address);



  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/", verifyToken, async (req, res) => {

  try {
    const userData = await userDetails(req.headers);
    const orders = await Order.find({ userId: userData._id }).sort({createdAt: -1});
    // let productsa=[]
    // const productsdata = orders.map(product => {
    //  product.products
    //    .map(async product => {  
    //    // console.log(product.productId)
    //     const singleproduct = await Product.findById("63ae08ac3bec969795d9f166").then(productl => {
    //      // console.log(productl)
    //       productsa.push({
    //         productId: product.productId,
    //         productName: productl.title,
    //         quantity: product.quantity,
    //         amount: product.amount,
    //         unit: product.unit

    //     });

    //     }, ()=>{
    //       res.status(200).json(productsa);
    //     });
    // console.log("kasnmz,",singleproduct);



    //       })
    // })
    //   console.log(productsa);
    //   //orders = Object.assign(orders,products);
    //  // console.log(productsdata)
    const data = {
      success: true,
      message: "OKk",
      data: orders,


    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", verifyToken, async (req, res) => {

  try {

    console.log(req.params.id);
    const orders = await Order.findById(req.params.id);
   
    function findDateTime(timestamp) {
      const date = new Date(Date.parse(timestamp));
      const month = date.toLocaleString('default', { month: 'long' });  // 0 for January, 1 for February, etc.
      const day = date.getDate();
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();


      return `${day} ${month} ${year} ${hours}:${minutes}:${seconds} `;
    }
    console.log(orders)
    const data = {
      success: true,
      message: "OK",
      data: {
        ...orders._doc,

        statusTimeline: [
          {
            title: "Confirmed",
            
            time: findDateTime(orders.createdAt),
            isComplete: true
          },
          {
            title: "Delivered",
            time:
              Date.parse(orders.createdAt) === Date.parse(orders.updatedAt)
                ? ""
                : findDateTime(orders.updatedAt),
            isComplete:
              Date.parse(orders.createdAt) === Date.parse(orders.updatedAt)
                ? false
                : true
          }
        ]
      }
    };
    

    // const orders = await Order.find({ userId: userData._id });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});


// //GET ALL

router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const query = Order.find().skip((page - 1) * limit).limit(limit).lean();
    query.select('-__v');
    const orders = await query.exec();
    
    res.status(200).json(orders);
  }

  catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
