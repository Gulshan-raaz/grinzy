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
        productImage: {
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
           type: String,
           required: true
           },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Confirmed" },
    otp: { type: Number, required: true},
    orderid: { type: String },
    isPaid: { type: Boolean, default:false },
    duesAmount: { type: Number,}
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
