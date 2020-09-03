'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: {
        args: true
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: {
        args: false,
        message: 'Please enter your username'
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: {
        args: false,
        message: 'Please enter your email'
      }
    },
    phoneNo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: {
        args: false,
        message: 'Please enter your phone number'
      }
    },
    gender: DataTypes.STRING,
    passkey: DataTypes.STRING,
    role: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
  }, 
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};