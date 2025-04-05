const { body, validationResult } = require("express-validator")

const productValidation = [
  body("name")
    .isString().withMessage("Name must be a string")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
  body("description")
    .isString().withMessage("Description must be a string")
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 3 }).withMessage("Description must be at least 3 characters long"),
  body("price")
    .isNumeric().withMessage("Price must be a number")
    .notEmpty().withMessage("Price is required")
    .isLength({ min: 1 }).withMessage("Price must be at least 1 character long")
]

module.exports = productValidation;
