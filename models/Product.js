const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    price: { type: Number, required: true },

    minUnitName: { type: String, required: true},
    maxUnitName : { type: String, required: true},
    minStart : { type: mongoose.Types.Decimal128, required: true},
    maxStart : { type: mongoose.Types.Decimal128, required: true},
    minEnd : { type: mongoose.Types.Decimal128, required: true},
    maxEnd : { type: mongoose.Types.Decimal128, required: true},
    minStepSize : { type: mongoose.Types.Decimal128, required:true},
    maxStepSize : { type: mongoose.Types.Decimal128,required:true},
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
