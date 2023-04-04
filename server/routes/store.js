const express = require("express");
const controller = require("../controllers/store");

const router = express.Router();

router.get("/:id", controller.findById);

module.exports = router;
