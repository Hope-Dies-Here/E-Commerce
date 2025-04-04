const express = require("express");
const router = express.Router();
const { isCustomer } = require("../middlewares/verifyUsers");
const {
  addToCart,
  getCartItems,
  removeFromCart,
  clearCart,
  checkout,
} = require("../controllers/CartControllers");

router.get("/", isCustomer, getCartItems);
router.post("/", isCustomer, addToCart);
router.delete("/:id", isCustomer, removeFromCart);
router.delete("/", isCustomer, clearCart);

router.post("/checkout", isCustomer, checkout);
module.exports = router;
