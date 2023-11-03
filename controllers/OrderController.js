const { Order, User } = require("../models/index.js");
// const {Op} = Sequelize

// const OrderController = {
//   create(req, res) {
//     Order.create(req.body)
//       .then((order) =>
//         res.status(201).send({ message: "Order placed succcessfully", order})
//       )
//       .catch(console.error);
//   },
//   getAll(req, res) {
//     Order.findAll({
//       include: [User]
//     })
//       .then((orders) => res.send(orders))
//       .catch((err) => {
//         console.error(err);
//         res
//           .status(500)
//           .send({ message: "Unexpected error while charging the orders" });
//       });
//   },
// };

const OrderController = {
  async create(req, res) {
    try {
      const order = await Order.create(req.body);
      res.status(201).send({ message: "Order placed successfully", order });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while trying to place the order");
    }
  },
  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: [User]
      });
      res.send(orders);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while charging the orders");
    }
  },
};

module.exports = OrderController;