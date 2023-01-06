const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        productName: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        amount: {
          type: Number,
        },
        unit: {
           type: String
           },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "created" },
    otp: { type: Number, required: true},
    orderid: { type: String },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
