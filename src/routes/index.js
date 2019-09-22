const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const productRoute = require("./product");

router.use("/auth", authRouter);
router.use("/product", productRoute);

module.exports = router;
