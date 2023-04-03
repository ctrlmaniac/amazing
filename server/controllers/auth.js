const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

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
      const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.json(token);
    }

    return res.json("credenziali non valide");
  });
};

module.exports = {
  register,
  login,
};
