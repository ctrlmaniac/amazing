const express = require("express");
const controller = require("../controllers/user");
const authenticateToken = require("../middlewares/authenticateToken");
const isAdmin = require("../middlewares/isAdmin");

const router = express.Router();

router.get("s", authenticateToken, isAdmin, controller.findAll);
router.get("/:id", authenticateToken, controller.findById);

module.exports = router;
