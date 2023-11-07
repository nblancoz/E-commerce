const { Product, Category } = require("../models/index.js");

const ProductController = {
  async create(req, res, next) {
    try {
      const product = await Product.create(req.body);
      product.addCategory(req.body.CategoryId);
      res
        .status(201)
        .send({ message: "Product created successfully", product });
    } catch (error) {
      console.error(error);
      res
      .status(500)
      .send({ message: "Unexpected error in the creation of the product", error });
      next(error)
    }
  },
  async update(req, res) {
    try {
      await Product.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send("Product updated successfully");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Unexpected error updating the product", error });
    }
  },
  async delete(req, res) {
    try {
      await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send("Product deleted successfully");
    } catch (error) {
      console.error(error);
      res
      .status(500)
      .send({ message: "Unexpected error deleting the product", error });
    }
  },
  async getAll(req, res) {
    try {
      const product = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
        ],
      });
      res.send(product);
    } catch (error) {
      console.error(error);
      res
      .status(500)
      .send({ message: "Unexpected error showing the products", error });
    }
  },
  async getOneById(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.send(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Unexpected error looking for the product", error });
    }
  },
  async getOneByName(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          name: req.params.name,
        },
      });
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.send(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Unexpected error looking for the product", error });
    }
  },
  async getByPrice(req, res) {
    try {
      const products = await Product.findAll({
        where: {
          price: req.params.price,
        },
      });
      if (products.length < 1) {
        return res.status(404).send("Product with that price not found");
      }
      res.send(products);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Unexpected error looking for the product", error });
    }
  },
  async sortByPrice(req, res) {
    try {
      const product = await Product.findAll({
        order: [["price", "DESC"]],
      });
      res.send(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Unexpected error sorting the products", error });
    }
  },
};

module.exports = ProductController;