const { Order, User, Product } = require("../models/index.js");

const OrderController = {
  async create(req, res) {
    try {
      const order = await Order.create({UserId:req.user.id,ProductId:req.body.ProductId});
      order.addProduct(req.body.ProductId);
      res.status(201).send({ message: "Order placed successfully", order });
    } catch (error) {
      console.error(error);
      res
      .status(500)
      .send({ message: "Unexpected error while placing the order", error });
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
      res
      .status(500)
      .send({ message: "Unexpected error charging the orders", error });
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
      res
      .status(500)
      .send({ message: "Unexpected error deleting the order", error });
    }
  },
};

module.exports = OrderController;