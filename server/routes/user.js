const express = require("express");
const controller = require("../controllers/user");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.get("", authenticateToken, controller.findAll);

module.exports = router;
