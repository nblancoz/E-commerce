const { Product, Category } = require("../models/index.js");

const ProductController = {
  create(req, res) {
    Product.create(req.body)
      .then((product) =>
        res
          .status(201)
          .send({ message: "Product created successfully", product })
      )
      .catch((err) => console.error(err));
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
        .send("Unexpected error while trying to update de product");
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
        .send("Unexpected error while trying to delete the product");
    }
  },
  getAll(req, res) {
    Product.findAll({
        include: [Category]
    })
      .then((products) => 
      product.addOrder(req.body.OrderId),
      res.send(products))
      .catch((err) => {
        console.error(err);
        res.status(500).send("Unexpected error while charging the categories");
      });
  },
  getOneById(req, res) {
    Product.findOne({
      where: {
        id: req.params.id,
      },
    }).then((User) => res.send(User));
  },
};

module.exports = ProductController;