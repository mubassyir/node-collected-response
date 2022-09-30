const db = require("../models");
const User = db.user;
const responseHelper = require("../helper/responseHelper");


signUp=(req, res, next) => {
  /*
      reset helper
                    */       
  responseHelper.errors=[];
  for (const key in responseHelper.message) {
    delete responseHelper.message[key];
  }

  //check request body
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    responseHelper.errors.push("Field cannot empty");
    responseHelper.statusCode = 500;
  }
  // Username
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      responseHelper.statusCode = 500;
      responseHelper.errors.push("user already exsist");
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) { 
        responseHelper.statusCode = 500;
        responseHelper.errors.push("email already exsist");
      }
      next();
    });
  });
};
module.exports = signUp;
 