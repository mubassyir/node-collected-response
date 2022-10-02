const responseHelper = require("../helper/responseHelper");

product = (req, res, next) => {
  const { productname, price, imageurl } = req.body;

  if (!productname) {
    responseHelper.errors.push("productname field empty");
    responseHelper.statusCode = 500;
  }
  if (!price) {
    responseHelper.errors.push("price field empty");
    responseHelper.statusCode = 500;
  }
  if (!imageurl) {
    responseHelper.errors.push("imageurl field empty");
    responseHelper.statusCode = 500;
  }
  next();
};
module.exports = product;
