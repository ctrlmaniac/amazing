const bcrypt = require("bcryptjs");
const _ = require("lodash");
const prisma = require("../utils/prisma");

const register = async (req, res, next) => {
  const data = req.body;

  bcrypt.hash(data.password, 12).then(async (password) => {
    const user = await prisma.user.create({
      data: {
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: password,
      },
    });

    res.json(user);
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (_.isEmpty(user)) {
    return res.json("utente non trovato");
  }

  bcrypt.compare(password, user.password).then((doMatch) => {
    if (doMatch) {
      return res.json(user);
    }

    return res.json("credenziali non valide");
  });
};

module.exports = {
  register,
  login,
};
