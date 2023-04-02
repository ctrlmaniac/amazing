const prisma = require("../utils/prisma");

const findAll = async (req, res, next) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
};

module.exports = {
  findAll,
};
