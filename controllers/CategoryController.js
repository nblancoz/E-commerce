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
      res.status(500).send("Error whilte trying to create the category");
    }
  },
  async getAll(req, res) {
    try {
      const categories = await Category.findAll();
      res.send(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error while charging the categories");
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
        .send("Unexpected error while trying to update de category");
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
        .send("Unexpected error while trying to delete the category");
    }
  },
  async getOneById(req, res) {
    try {
      const category = await Category.findAll({
        where: {
          id: req.params.id
        }
      })
      res.send(category)
    } catch (error) {
      console.error(error)
      res.status(500).send("Unexpected error while trying to search to this category") // al colocar un id que no existe sale un array vacio
    }
  },
  async getByName(req, res) {
    try {
      const category = await Category.findAll({
        where: {
          name: req.params.name
        }
      })
      res.send(category)
    } catch (error) {
      console.error(error)
      res.status(404).send("Category not found")
    }
  }
};

module.exports = CategoryController;
