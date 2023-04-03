const express = require("express");
const controller = require("../controllers/user");
const authenticateToken = require("../middlewares/authenticateToken");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.get("", authenticateToken, isAdmin, controller.findAll);

module.exports = router;
