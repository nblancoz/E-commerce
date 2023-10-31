const { User, Order } = require("../models/index.js");

const UserController = {
  create(req, res) {
    req.body.role = "User";
    User.create(req.body)
      .then((user) =>
        res.status(201).send({ message: "User created succesfully", user })
      )
      .catch(console.error);
  },
  getAll(req, res) {
    User.findAll({
      include: [Order],
    })
      .then((users) => res.send(users))
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send({ message: "Unexpected error while charging the orders." });
      });
  },
};

module.exports = UserController;