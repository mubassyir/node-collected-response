let errors = [];
let token ="";
let result = [];
let message = {};
let statusCode = 200;

let responseHelper = {
  errors: errors,
  message: message,
  statusCode: statusCode,
  token: token,
  result:result
};

module.exports = responseHelper;
