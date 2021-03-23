'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Group.belongsTo(models.Client, {
        foreignKey: "clientId",
        targetKey: "id",
      });
      Group.hasMany(models.ProductGroups, {
        foreignKey: 'groupId',
      });
    }
  };
  Group.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};