const responseHelper = require("../helper/responseHelper");

exports.test = (req, res) => {
  if(responseHelper.errors.length>0){
  }
  res
    .status(responseHelper.statusCode)
    .json({
      status: responseHelper.errors.length > 0 ? "ERROR" : "OK",
      message: responseHelper.message,
      errors:responseHelper.errors
    });
};
