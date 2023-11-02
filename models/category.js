'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Product,{
        through:models.Category_Product
      })
    }
  }
  Category.init({
    cleats: DataTypes.STRING,
    shirts: DataTypes.STRING,
    accessories: DataTypes.STRING,
    brand: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};