'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        targetKey: "id",
      });
      User.belongsTo(models.Client, {
        foreignKey: "clientId",
        targetKey: "id",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: {
          args: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      phoneNo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: {
          args: false,
          message: 'Please enter your phone number',
        },
      },
      gender: DataTypes.STRING,
      password: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
