const db = require("../models");
const Product = db.product;
const responseHelper = require("../helper/responseHelper");

exports.showData = async (req, res) => {
  if (responseHelper.errors.length === 0) {
    await Product.findAll()
      .then((products) => {
        responseHelper.message = products;
        responseHelper.statusCode = 200;
      })
      .catch((err) => {
        responseHelper.errors.push(err.message);
        responseHelper.statusCode = 500;
        return res.status(responseHelper.statusCode).json({
          status: "ERROR",
          message: {},
          errors: responseHelper.errors,
        });
      });
  }
  res.status(responseHelper.statusCode).json({
    status: responseHelper.errors.length > 0 ? "ERROR" : "OK",
    message: responseHelper.message,
    errors: responseHelper.errors,
  });
};

exports.addProduct = async (req, res) => {
  if (responseHelper.errors.length === 0) {
    const { productname, price, imageurl } = req.body;
    await Product.create({
      productname: productname,
      price: price,
      imageurl: imageurl,
    })
      .then((product) => {
        responseHelper.statusCode = 201;
        responseHelper.message = product.dataValues;
      })
      .catch((err) => {
        responseHelper.errors.push(err.message).then(() => {
          return res.status(500).json({
            status: "ERROR",
            message: {},
            errors: responseHelper.errors,
          });
        });
      });
  }
  res.status(responseHelper.statusCode).json({
    status: responseHelper.errors.length === 0 ? "OK" : "ERROR",
    message: responseHelper.message,
    errors: responseHelper.errors,
  });
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  if (responseHelper.errors.length === 0)
    await Product.findByPk(id)
      .then((products) => {
        responseHelper.statusCode = 200;
        responseHelper.message = products;
      })
      .catch((err) => {
        responseHelper.errors = err.message;
        return res.status(500).json({
          status: "ERROR",
          message: {},
          errors: responseHelper.errors,
        });
      });

  res.status(responseHelper.statusCode).json({
    status: responseHelper.errors.length === 0 ? "OK" : "ERROR",
    message: responseHelper.message,
    errors: responseHelper.errors,
  });
};

exports.updateProduct = async (req, res) => {
  if (responseHelper.errors.length === 0) {
    const { productname, price, imageurl } = req.body;
    await Product.update(
      { productname: productname, price: price, imageurl: imageurl },
      { returning: true, where: { product_id: req.params.id } }
    )
      .then((updated) => {
        responseHelper.message = updated[1];
        responseHelper.statusCode = 200;
      })
      .catch((err) => {
        responseHelper.errors.push(err.message);
        return res
          .status(500)
          .json({
            status: responseHelper.errors.length > 0 ? "ERROR" : "OK",
            message:{},
            errors: responseHelper.errors,
          });
      });
  }
  res.status(responseHelper.statusCode).json({
    status: responseHelper.errors.length > 0 ? "ERROR" : "OK",
    message: responseHelper.message,
    errors: responseHelper.errors,
  });
};

exports.deleteById = async (req, res) => {
  if (responseHelper.errors.length === 0) {
    const { id } = req.params;
    await Product.findByPk(id)
      .then((i) => {
        Product.destroy({ where: { product_id: i.product_id } }).then((j) => {
          responseHelper.message = i;
          responseHelper.statusCode = 201;
        });
      })
      .catch((err) => {
        responseHelper.errors.push(err.message);
        return res.status(500).json({
          status: "ERROR",
          message: {},
          errors: responseHelper.errors,
        });
      });
  }
  res.status(responseHelper.statusCode).json({
    status: responseHelper.errors.length > 0 ? "ERROR" : "OK",
    message: responseHelper.message,
    errors: responseHelper.errors,
  });
};
