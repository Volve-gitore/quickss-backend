'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Product.belongsTo(models.Client, {
        as: 'client',
        foreignKey: "clientId",
        targetKey: "id",
      });
      Product.hasMany(models.ProductGroups, {
        foreignKey: 'productId',
      });
      Product.belongsTo(models.Group, {
        foreignKey: "groupId",
        targetKey: "id",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        targetKey: "id",
      });
      Product.belongsTo(models.SubCategory, {
        foreignKey: "subCategoryId",
        targetKey: "id",
      });
      Product.belongsTo(models.Type, {
        as: 'productType',
        foreignKey: 'type',
      });
    }
  };
  Product.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    flag: {
      type: DataTypes.NUMBER,
    },
    images: DataTypes.ARRAY(DataTypes.TEXT),
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};