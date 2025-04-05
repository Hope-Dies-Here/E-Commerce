const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  sampleProducts,
  setPrice,
  getProductById,
  getProductsByName,
} = require("../controllers/ProductControllers");
const { isAdmin } = require("../middlewares/verifyUsers");

router.get("/", getProducts);
router.get("/search", getProductsByName);
router.get("/:id", getProductById);

router.patch("/set-price/:id", isAdmin, setPrice);
router.post("/", isAdmin, createProduct);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);


function smallLetter(params) {
const name = "beyene"
    return params.toLowerCase(); 
}

router.post("/sample", sampleProducts);

module.exports = router;
