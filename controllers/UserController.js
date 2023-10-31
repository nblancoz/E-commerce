const { User, Order, Sequelize, Token } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = Sequelize;
const { jwt_secret } = require("../config/config.json")["development"];

const UserController = {
  create(req, res) {
    req.body.role = "User";
    const password = bcrypt.hashSync(req.body.password, 10);
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
  getOneByName(req, res) {
    User.findOne({
      where: {
        name: {
          [Op.like]: `%${req.params.name}%`,
        },
      },
      include: [Order],
    }).then((User) => res.send(User));
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
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "The user/password are incorrect" });
      }
      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res.send({ message: "Welcome," + user.name, user, token });
    });
  },
  async delete(req, res) {
    await User.destroy({
      where: {
        name: req.params.name,
      },
    });
    res.send("User deleted sucessfully");
  },
  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({message: "See you soon"})
    } catch (error) {
      console.error(error);
      res.status(500).send({message: "Unexpected error trying to logout"})
    }
  },
};

module.exports = UserController;
