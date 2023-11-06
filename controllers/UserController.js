const {
  User,
  Order,
  Sequelize,
  Token,
  Product,
} = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = Sequelize;
const { jwt_secret } = require("../config/config.json")["development"];

const UserController = {
  async create(req, res, next) {
    try {
      req.body.role = "User";
      const password = bcrypt.hashSync(req.body.password, 10);
      await User.create({ ...req.body, password });
      res.status(201).send("User created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error creating the user");
      next(error);
    }
  },
  async getAll(req, res) {
    try {
      const users = await User.findAll({
        include: {
          model: Order,
          attributes: ["id"],
          include: {
            model: Product,
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
        },
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
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while looking for the user");
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
  async deleteByName(req, res) {
    try {
      const user = await User.destroy({
        where: {
          name: req.params.name,
        },
      });
      if (user === 0) {
        return res.status(404).send("User with that name not found");
      }
      res.send("User deleted sucessfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while deleting the user");
    }
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
      res.send("See you soon");
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error trying to logout");
    }
  },
};

module.exports = UserController;