const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Protected Route
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

// Member Only
router.get(
  "/member",
  authMiddleware,
  roleMiddleware("member"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Member",
    });
  }
);

// Librarian Only
router.get(
  "/librarian",
  authMiddleware,
  roleMiddleware("librarian"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Librarian",
    });
  }
);

module.exports = router;