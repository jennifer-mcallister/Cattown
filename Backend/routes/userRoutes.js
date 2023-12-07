const express = require("express");
const router = express.Router();


const {
    login,
    register,
    resetPassword,
    forgottPassword
} = require("../controllers/userController");

router.get("/login", login);
router.post("/register", register);
router.get("/forgott-password", forgottPassword);
router.put("/reset-password", resetPassword);

module.exports = router;