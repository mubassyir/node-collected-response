const middleware = require("../middleware")
const productController = require("../controllers/product.controller")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/v1/products",middleware.verifyToken,productController.showData);
  app.post("/v1/products",[middleware.verifyToken,middleware.product],productController.addProduct);
  app.get("/v1/products/:id",[middleware.verifyToken],productController.getById);
  app.put("/v1/products/:id",middleware.verifyToken,productController.updateProduct);
  app.delete("/v1/products/:id",middleware.verifyToken,productController.deleteById)

};
