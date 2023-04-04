const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const prisma = require("../utils/prisma");

const register = async (req, res, next) => {
  const data = req.body;

  const checkIfUserExists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (_.isEmpty(checkIfUserExists)) {
    bcrypt.hash(data.password, 12).then(async (password) => {
      const user = await prisma.user.create({
        data: {
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          password: password,
        },
      });

      const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.json({
        email: user.email,
        role: user.role,
        token: token,
      });
    });
  } else {
    return res.json("Utente già esistente!");
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (_.isEmpty(user)) {
    return res.status(404).json("utente non trovato");
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

      return res.json({
        email: user.email,
        role: user.role,
        token: token,
      });
    }

    return res.json("credenziali non valide");
  });
};

module.exports = {
  register,
  login,
};
