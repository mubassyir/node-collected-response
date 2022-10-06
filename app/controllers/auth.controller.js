const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const responseHelper = require("../helper/responseHelper");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (responseHelper.errors.length === 0) {
    await User.create({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 10),
    })
      .then((user) => {
        responseHelper.statusCode = 201;
        responseHelper.message = user.dataValues;
      })
      .catch((err) => {
        responseHelper.statusCode = 500;
        responseHelper.errors.push(err.message);
      });
  }

  res.status(responseHelper.statusCode).json({
    status: responseHelper.errors.length === 0 ? "OK" : "ERROR",
    message: responseHelper.message,
    errors: responseHelper.errors,
  });
};

exports.signin = async (req, res) => {
  await User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(async (user) => {
    if (!user) {
      responseHelper.errors.push("user not found");
      responseHelper.statusCode = 500;
    }
    if (responseHelper.errors.length === 0) {
      await bcrypt.compare(req.body.password, user.password).then((compare) => {
        if (!compare) {
          responseHelper.errors.push ("Password missmatch");
          responseHelper.statusCode = 500;
        } else {
          responseHelper.token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400,
          });
          responseHelper.statusCode = 200;
        }
      });
    }
  });
  res.status(responseHelper.statusCode).json({
    status: responseHelper.errors.length === 0 ? "OK" : "ERROR",
    token: responseHelper.token,
    errors: responseHelper.errors,
  });
};
