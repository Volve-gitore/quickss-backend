'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clients', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      contract: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      category: {
        type: Sequelize.ENUM,
        values: ['hotel', 'resto'],
      },
      description: {
        type: Sequelize.STRING,
      },
      bouquet: {
        type: Sequelize.ENUM,
        values: ['basic', 'moderate', 'premium'],
      },
      status: {
        type: Sequelize.ENUM,
        values: ['active', 'archived'],
      },
      stars: {
        type: Sequelize.INTEGER,
      },
      registrationNumber: {
        type: Sequelize.STRING,
        unique: true
      },
      province: {
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      sector: {
        type: Sequelize.STRING,
      },
      cell: {
        type: Sequelize.STRING,
      },
      village: {
        type: Sequelize.STRING,
      },
      googleMap: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      telephone: {
        type: Sequelize.INTEGER,
      },
      facebook: {
        type: Sequelize.STRING,
      },
      instagram: {
        type: Sequelize.STRING,
      },
      linkedIn: {
        type: Sequelize.STRING,
      },
      twitter: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clients');
  },
};
