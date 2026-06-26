const { body } = require("express-validator");

const createBookValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required"),

  body("isbn")
    .trim()
    .notEmpty()
    .withMessage("ISBN is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be greater than or equal to 0"),
];

const updateBookValidation = [
  body("title").optional().trim().notEmpty(),
  body("author").optional().trim().notEmpty(),
  body("isbn").optional().trim().notEmpty(),
  body("category").optional().trim().notEmpty(),
  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be greater than or equal to 0"),
];

module.exports = {
  createBookValidation,
  updateBookValidation,
};