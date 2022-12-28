const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const userDetails = async (header) => {
    if (header) {
        var authorization = header.token, decoded;
        try {
            decoded = jwt.verify(authorization, process.env.JWT_SEC);
        } catch (e) {
            return { "status": false, "message": "Unauthorized User", "data": {} };
        }
        var userId = decoded.id;
        // Fetch the user by id 
        const user = await User.findById(userId);
        const { business_Password, ...others } = user._doc;
       return user;
            
    }
}

module.exports = {
    userDetails

}