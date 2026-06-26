const express = require("express");
const router = express.Router();

const {
  register,
  login,
  changePassword,
} = require("../controllers/authController");

const {
  registerValidation,
  loginValidation,
  changePasswordValidation,
} = require("../validators/authValidator");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerValidation, register);

router.post("/login", loginValidation, login);

router.put(
  "/change-password",
  authMiddleware,
  changePasswordValidation,
  changePassword
);

module.exports = router;