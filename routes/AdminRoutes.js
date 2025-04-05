const express = require("express");
const router = express.Router();

const { adminRegister, adminLogin } = require("../controllers/AuthControllers");

// Admin registration route
router.post("/login", adminLogin);
router.post("/register/super-secure-endpoint", adminRegister);

module.exports = router;

