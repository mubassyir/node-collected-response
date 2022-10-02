const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const responseHelper = require("../helper/responseHelper.js");
const db = require("../models");

verifyToken = (req, res, next) => {
  /*
      reset helper
                    */
  responseHelper.errors = [];
  responseHelper.message = {};

  let token = req.headers["x-access-token"];

  if (!token) {
    responseHelper.errors.push("No token provided");
    responseHelper.statusCode = 500;
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        responseHelper.errors.push("Unauthorized");
      } else {
        req.userId = decoded.id;
      }
    });
  }
  next();
};

module.exports = verifyToken;
