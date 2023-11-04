const { Product, Category } = require("../models/index.js");

const ProductController = {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res
        .status(201)
        .send({ message: "Product created successfully", product });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while creating the product");
    }
  },
  async update(req, res) {
    try {
      const product = await Product.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send("Product updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while updating de product");
    }
  },
  async delete(req, res) {
    try {
      const product = await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send("Product deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while deleting the product");
    }
  },
  async getAll(req, res) {
    try {
      const product = await Product.findAll(); // show categories
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unexpected error while showing the products");
    }
  },
  async getOneById(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(404).send("Product not found");
    }
  },
  async getOneByName(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          name: req.params.name,
        },
      });
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(404).send("Product not found");
    }
  },
  async getByPrice(req, res) {
    try {
      const product = await Product.findAll({
        where: {
          price: req.params.price,
        },
      });
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(404).send("Product with that price not found"); // no sale error al buscar un precio que no existe
    }
  },
  async sortByPrice(req, res) {
    try {
      const product = await Product.findAll({
        order: [["price", "ASC"]],
      });
      res.send(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("Unexpected error while trying to sort the products");
    }
  },
};

module.exports = ProductController;