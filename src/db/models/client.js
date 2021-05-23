'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Client.hasMany(models.Type, {
        foreignKey: 'clientId',
      });
      Client.hasMany(models.Group, {
        foreignKey: 'clientId',
      });
      Client.hasMany(models.Category, {
        foreignKey: 'clientId',
      });
      Client.hasMany(models.Product, {
        foreignKey: 'clientId',
      });
      Client.hasMany(models.User, {
        foreignKey: "clientId",
      });
    }
  }
  Client.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      images: DataTypes.ARRAY(DataTypes.TEXT),
      contract: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        message: "contract is required"
      },
      category: {
        type: DataTypes.ENUM,
        values: ['hotel', 'resto'],
        message: 'category must be hotel or resto',
      },
      description: DataTypes.STRING,
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
        values: ['active', 'inactive', 'dormant', 'archived'],
        allowNull: {
          args: false,
          message: 'please provide the status',
        },
      },
      province: DataTypes.STRING,
      district: DataTypes.STRING,
      sector: DataTypes.STRING,
      cell: DataTypes.STRING,
      village: DataTypes.STRING,
      googleMap: DataTypes.STRING,
      stars: DataTypes.INTEGER,
      registrationNumber: {
        type: DataTypes.STRING,
        unique: true,
      },
      Email: DataTypes.STRING,
      Telephone: DataTypes.INTEGER,
      Facebook: DataTypes.STRING,
      Instagram: DataTypes.STRING,
      LinkedIn: DataTypes.STRING,
      Twitter: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Client',
    },
  );
  return Client;
};
