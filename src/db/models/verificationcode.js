'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerificationCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VerificationCode.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userID',
        foreignKeyConstraint: true,
      });
    }
  }
  VerificationCode.init(
    {
      userID: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'VerificationCode',
    },
  );
  return VerificationCode;
};
