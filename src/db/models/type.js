'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    
    static associate(models) {
      Type.belongsTo(models.Client, {
        as: 'client',
        foreignKey: 'clientId',
        foreignKeyConstraint: true,
      });    }
  };
  Type.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};