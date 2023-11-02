"use strict";
const { Model } = require("sequelize");
const orders_products = require("./order_product");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User),
      Order.belongsToMany(models.Product, {
        through: models.Order_Product
      })
    }
  }
  Order.init(
    {
      order_number: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};