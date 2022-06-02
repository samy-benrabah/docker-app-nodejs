const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();

router.post("/signup",authController.singUp);
router.post("/signin",authController.singIn);

module.exports = router;