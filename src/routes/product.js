const express = require("express");
const router = express.Router();

const { catchErrors } = require("../errorHandlers");
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controller/product.controller");

router
  .get("/", catchErrors(getProducts))
  .post("/", catchErrors(createProduct))
  .put("/:productId", catchErrors(updateProduct))
  .get("/:productId", catchErrors(getProduct))
  .delete("/:productId", catchErrors(deleteProduct));

module.exports = router;
