const express = require("express");
const router = express.Router();

const {
  login,
  register,
  resetPassword,
  forgottPassword,
} = require("../controllers/userController");

router.post("/login", login);
router.post("/register", register);
router.post("/forgott-password", forgottPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
