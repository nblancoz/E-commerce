const { Product } = require("../models/index.js");

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
          id: req.params.id
        },
      });
      res.send({ message: "Product updated successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          message: "Unexpected error while trying to update de product",
        });
    }
  },
};

module.exports = ProductController;