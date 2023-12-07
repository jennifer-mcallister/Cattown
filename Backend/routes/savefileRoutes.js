const express = require("express");
const router = express.Router();

const {
    loadSavefile,
    saveSavefile
} = require("../controllers/savefileController");

router.get("/load", loadSavefile);
router.put("/save", saveSavefile);

module.exports = router;