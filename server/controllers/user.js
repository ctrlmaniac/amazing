const prisma = require("../utils/prisma");

const findAll = async (req, res, next) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
};

const findById = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json(user);
};

module.exports = {
  findAll,
  findById,
};
