const { Order, User, Product } = require("../models/index.js");

const OrderController = {
  async create(req, res) {
    try {
      const order = await Order.create(req.body);
      order.addProduct(req.body.ProductId);
      res.status(201).send({ message: "Order placed successfully", order });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while placing the order");
    }
  },
  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: {
          model: User,
          attributes: ["id", "name"],
        },
        include: {
          model: Product,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      });
      res.send(orders);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while charging the orders");
    }
  },
  async deleteById(req, res) {
    try {
      await Order.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send("Order deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while deleting the order");
    }
  },
};

module.exports = OrderController;