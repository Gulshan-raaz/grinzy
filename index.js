const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const creditRoute = require("./routes/credit");
const homeRoute = require("./routes/home");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log("Error  : " + err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", creditRoute);
app.use("/api/home", homeRoute);
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});






