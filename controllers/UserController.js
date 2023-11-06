const { User, Order, Sequelize, Token } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = Sequelize;
const { jwt_secret } = require("../config/config.json")["development"];

const UserController = {
  async create(req, res) {
    try {
      req.body.role = "User";
      const password = bcrypt.hashSync(req.body.password, 10);
      await User.create({ ...req.body, password });
      res.status(201).send("User created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error creating the user");
    }
  },
  async getAll(req, res) {
    try {
      const users = await User.findAll({
        include: [Order],
      });
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while showing the users");
    }
  },
  async getOneByName(req, res) {
    try {
      const user = await User.findOne({
        where: {
          name: {
            [Op.like]: `%${req.params.name}%`,
          },
        },
        include: [Order],
      });
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(404).send("User not found");
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        return res.status(400).send("The user/password are incorrect");
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send("The user/password are incorrect");
      }
      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res.send({ message: "Welcome, " + user.name, user, token });
    } catch (error) {
      res.status(500).send("Unexpected error in the login");
    }
  },
  async delete(req, res) {
    await User.destroy({
      where: {
        name: req.params.name,
      },
    });
    res.send({ message: "User deleted sucessfully", user });
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
      res.send({ message: "See you soon", user });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error trying to logout");
    }
  },
};

module.exports = UserController;