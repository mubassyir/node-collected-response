const { sign } = require("jsonwebtoken");
const responseHelper = require("../helper/responseHelper");

signIn = (req, res, next) => {
  responseHelper.errors = [];
  for (const key in responseHelper.message) {
    delete responseHelper.message[key];
  }

  const { email, password } = req.body; 
  if (!email) {
    responseHelper.errors.push("email cannot blank");
    responseHelper.statusCode = 500;
  }
  if (!password) {
    responseHelper.errors.push("password cannot blank");
    responseHelper.statusCode = 500;
  }
  next();
};
module.exports = signIn;
