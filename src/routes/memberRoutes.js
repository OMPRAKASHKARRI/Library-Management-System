const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getAllMembers,
  deleteMember,
  getMyBorrowedBooks,
} = require("../controllers/memberController");

// Librarian Routes

router.get(
  "/",
  authMiddleware,
  roleMiddleware("librarian"),
  getAllMembers
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("librarian"),
  deleteMember
);

// Member Routes

router.get(
  "/me/books",
  authMiddleware,
  roleMiddleware("member"),
  getMyBorrowedBooks
);

module.exports = router;