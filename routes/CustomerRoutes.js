const express = require("express");
const router = express.Router();
const { isCustomer } = require("../middlewares/verifyUsers");

const { profile, getCustomers } = require("../controllers/CustomerControllers");
const { login, register } = require("../controllers/AuthControllers");
const { isAdmin } = require("../middlewares/verifyUsers");

router.post("/login", login);
router.post("/register", register);

router.get("/", isAdmin, getCustomers);
router.get("/profile", isCustomer, profile);

module.exports = router;
