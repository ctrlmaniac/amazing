const prisma = require("../utils/prisma");

const listAll = async (req, res, next) => {
  const articles = await prisma.article.findMany();

  res.json(articles);
};

module.exports = {
  listAll,
};
