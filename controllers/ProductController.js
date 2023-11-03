const { where } = require("sequelize");
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
  async getAll(req, res) {
    try {
      const product = await Product.findAll();
      res.send(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send("Unexpected error while trying to show the products");
    }
  },
  // getAll(req, res) {
  //   Product.findAll({
  //     // include: [Category] // error porque no se encuentra la tabla category_product, se cambio el nombre porque estaba mal puesto
  //   })
  //     .then(
  //       (products) => products.addOrder(req.body.OrderId),
  //       res.send(products)
  //     )
  //     .catch((err) => {
  //       console.error(err);
  //       res.status(500).send("Unexpected error while charging the categories");
  //     });
  // },
  getOneById(req, res) {
    Product.findOne({
      where: {
        id: req.params.id,
      },
    }).then((User) => res.send(User));
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
      res.status(500).send("Unexpected error while trying to show the product");
    }
  },
  async getByPrice(req, res) {
    try {
      const product = await Product.findAll({
        where: {
          price: req.params.price
        }
      })
      res.send(product)
    } catch (error) {
      console.error(error)
      res.status(404).send("Product with that price not found")
    }
  },
  // async sortByPrice(req,res) {
  //   try {
  //     const product = await Product.findAll({
  //       order: [
  //         [Product.price, "ASC"]
  //       ]
  //     })
  //     res.send(product)
  //   } catch (error) {
  //     console.error(error)
  //     res.status(404).send("Unexpected error while trying to sort the products")
  //   }
  // }
};

module.exports = ProductController;