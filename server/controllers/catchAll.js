const catchAll = (req, res, next) => {
  return res.sendStatus(404);
};

module.exports = catchAll;
