const prisma = require("../utils/prisma");

const findById = async (req, res, next) => {
  const { id } = req.params;

  const store = await prisma.store.findUnique({
    where: {
      id: id,
    },
  });

  return res.json(store);
};

module.exports = {
  findById,
};
