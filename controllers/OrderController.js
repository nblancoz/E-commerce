const { Order, User } = require("../models/index.js");

const OrderController = {
  async create(req, res) {
    try {
      const order = await Order.create(req.body);
      res.status(201).send({ message: "Order placed successfully", order });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while placing the order");
    }
  },
  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: [User], // include products
      });
      res.send(orders);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while charging the orders");
    }
  },
};

module.exports = OrderController;