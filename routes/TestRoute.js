const express = require("express");
const router = express.Router();

const { getCartItems, addToCart } = require("../controllers/TempCart");

router.get("/cart", getCartItems);
router.post("/cart", addToCart);

module.exports = router;
