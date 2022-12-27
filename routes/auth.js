const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    business_Name: req.body.business_Name,
    business_Email: req.body.business_Email,
    business_Credit: req.body.business_Credit,
    business_Number: req.body.business_Number,
    business_Address: req.body.business_Address,
    business_Credit: req.body.business_Credit,
    business_image: req.body.business_image,
    business_aadhar: req.body.business_aadhar,
    emergency_contact: req.body.emergency_contact,
    business_Password: CryptoJS.AES.encrypt(
      req.body.business_Password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({"status":true,"message":"User Created ",data:savedUser});
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
              business_Number: req.body.business_Number
            }
        );

        !user && res.status(401).json({"status":false,"message":"User Not Exist","data":{}});

        const hashedPassword = CryptoJS.AES.decrypt(
            user.business_Password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.business_Password;
        
        originalPassword != inputPassword && 
            res.status(401).json({"status":false,"message":"Password Incorrect","data":{}});

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
  
        const { business_Password, ...others } = user._doc;  
        res.status(200).json({"status":true,"message":"Login Success","data":{...others, accessToken}});

    }catch(err){
        res.status(500).json(err);
    }

});




//Profile

router.get('/profile', async (req, res) => {
  try{
     
      

    if (req.headers) {
      var authorization = req.headers.token,decoded;
      try {
          decoded = jwt.verify(authorization, process.env.JWT_SEC);
      } catch (e) {
          return res.status(401).send({"status":false,"message":"Unauthorized User","data":{}});
      }
      var userId = decoded.id;
      // Fetch the user by id 
      const user = await User.findById(userId);
      const { business_Password, ...others } = user._doc;
      res.status(200).json({"status":true,"message":"Profile Loaded","data":others});
  }

      

     

  }catch(err){
      res.status(500).json(err);
  }

});

module.exports = router;
