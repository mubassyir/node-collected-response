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

  app.get("/api/products",middleware.verifyToken,productController.showData);
  app.post("/api/products",[middleware.verifyToken,middleware.product],productController.addProduct);
  app.get("/api/products/:id",[middleware.verifyToken],productController.getById);
  app.put("/api/products/:id",middleware.verifyToken,productController.updateProduct);
  app.delete("/api/products/:id",middleware.verifyToken,productController.deleteById)

};
