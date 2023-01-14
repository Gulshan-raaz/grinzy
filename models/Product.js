const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    title_hindi: { type: String,required: true},
    desc: { type: String },
    img: { type: String ,required: true,default: "https://grinzy.s3.amazonaws.com/product/6_12_2022_17_41_58Onion.png"},
    categories: { type: Array },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true},
    percent: { type: Number, Default:0 },
    info: { type: String, },

    minUnitName: { type: String },
    maxUnitName : { type: String},
    minStart : { type: Number },
    maxStart : { type: Number },
    minEnd : { type: Number},
    maxEnd : { type: Number},
    minStepSize : { type: Number},
    maxStepSize : { type: Number, default: 0 },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
