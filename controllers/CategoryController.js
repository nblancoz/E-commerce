const { Category, Product } = require("../models/index.js");

const CategoryController = {
  async create(req, res) {
    try {
      const category = await Category.create(req.body);
      res
        .status(201)
        .send({ message: "Category created successfully", category });
    } catch (error) {
      console.error(error);
      res
      .status(500)
      .send({ message: "Unexpected errorcreating the category", error });
    }
  },
  async update(req, res) {
    try {
      await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.send("Category updated successfully");
    } catch (error) {
      console.error(error);
      res
      .status(500)
      .send({ message: "Unexpected error updating de category", error });
    }
  },
  async delete(req, res) {
    try {
      await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send("Category deleted successfully");
    } catch (error) {
      console.error(error);
      res
      .status(500)
      .send({ message: "Unexpected error deleting the category", error });
    }
  },
  async getAll(req, res) {
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Product,
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
        ],
      });
      res.send(categories);
    } catch (error) {
      console.error(error);
      res
      .status(500)
      .send({ message: "Unexpected error showing the categories", error });
    }
  },
  async getOneById(req, res) {
    try {
      const category = await Category.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!category) {
        return res.status(404).send("Category not found");
      }
      res.send(category);
    } catch (error) {
      console.error(error);
      res
      .status(500)
      .send({ message: "Unexpected error looking for the category", error });
    }
  },
  async getByName(req, res) {
    try {
      const category = await Category.findAll({
        where: {
          name: req.params.name,
        },
      });
      if (!category) {
        return res.status(404).send("Category not found");
      }
      res.send(category);
    } catch (error) {
      console.error(error);
      res
      .status(500)
      .send({ message: "Unexpected error looking fot the category", error });
    }
  },
};

module.exports = CategoryController;