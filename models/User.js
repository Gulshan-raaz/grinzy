const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    business_Name: { type: String, required: true},
    business_Email: { type: String},
    business_Number: { type: String, required: true, unique: true },
    business_Address: { type: Object, required: true},
    business_Password: { type: String, required: true },
    business_Credit: { type:Number, required: true,default:0},
    business_category: { type: String,required: true},
    business_image: { type: String},
    business_aadhar: { type: String},
    emergency_contact: { type: String},
    contact_person: { type: String},
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
