'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductGroups.belongsTo(models.Group, {
        foreignKey: 'groupId',
        targetKey: 'id',
      });
      ProductGroups.belongsTo(models.Product, {
        foreignKey: 'productId',
        targetKey: 'id',
      });
    }
  }
  ProductGroups.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: 'ProductGroups',
    },
  );
  return ProductGroups;
};
