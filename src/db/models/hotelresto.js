'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HotelResto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HotelResto.init(
    {
      name: DataTypes.STRING,
      images: DataTypes.ARRAY(DataTypes.TEXT),
      category: {
        type: DataTypes.ENUM,
        values: ['hotel', 'resto'],
        message: "category must be hotel or resto"
      },
      description: DataTypes.STRING,
      location: DataTypes.JSONB,
      bouquet: {
        type: DataTypes.ENUM,
        values: ['basic', 'moderate', 'premium'],
        allowNull: {
          args: false,
          message: 'please provide the bouquet',
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ['active', 'inactive', 'dormant'],
        allowNull: {
          args: false,
          message: 'please provide the status',
        },
      },
    },
    {
      sequelize,
      modelName: 'HotelResto',
    },
  );
  return HotelResto;
};
