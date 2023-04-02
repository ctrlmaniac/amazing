const express = require("express");
const controller = require("../controllers/user");

const router = express.Router();

router.get("/users", controller.findAll);

module.exports = router;
