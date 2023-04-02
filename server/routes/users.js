const express = require("express");
const prisma = require("../utils/prisma");

const router = express.Router();

router.get("/users", async (req, res, next) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

module.exports = router;
