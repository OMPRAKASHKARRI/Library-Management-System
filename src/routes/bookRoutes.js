const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createBookValidation,
  updateBookValidation,
} = require("../validators/bookValidator");

const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require("../controllers/bookController");

// Get all books
router.get(
  "/",
  authMiddleware,
  getAllBooks
);

// Get single book
router.get(
  "/:id",
  authMiddleware,
  getBookById
);

// Add Book
router.post(
  "/",
  authMiddleware,
  roleMiddleware("librarian"),
  createBookValidation,
  addBook
);

// Update Book
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("librarian"),
  updateBookValidation,
  updateBook
);

// Delete Book
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("librarian"),
  deleteBook
);
// Borrow Book
router.post(
  "/:id/borrow",
  authMiddleware,
  roleMiddleware("member"),
  borrowBook
);
// Return Book
router.post(
  "/:id/return",
  authMiddleware,
  roleMiddleware("member"),
  returnBook
);
module.exports = router;