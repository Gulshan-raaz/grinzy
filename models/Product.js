const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true},
    percent: { type: Number, Default:0 },

    minUnitName: { type: String, required: true},
    maxUnitName : { type: String, required: true},
    minStart : { type: Number, required: true},
    maxStart : { type: Number, required: true},
    minEnd : { type: Number, required: true},
    maxEnd : { type: Number, required: true},
    minStepSize : { type: Number, required:true},
    maxStepSize : { type: Number,required:true},
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
