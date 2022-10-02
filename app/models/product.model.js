module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    product_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productname: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.STRING,
    },
    imageurl: {
      type: Sequelize.STRING,
    },
  });

  return Product;
};
