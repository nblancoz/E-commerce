const { User, Order } = require("../models/index.js");
const bycrypt = require("bycryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

const UserController = {
  create(req, res) {
    req.body.role = "User";
    const password = bycrypt.hashSync(req.body.password, 10);
    User.create({ ...req.body, password })
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
  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({ message: "The user/password are incorrect" });
      }
      const isMatch = bycrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "The user/password are incorrect" });
      }
      let token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res.send({ message: "Bienvenid@" + username, user, token });
    });
    res.send(user);
  },
};

module.exports = UserController;