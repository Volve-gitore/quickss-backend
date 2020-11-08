'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HotelRestos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      category: {
        type: Sequelize.ENUM,
        values: ['hotel', 'resto'],
      },
      description: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.JSONB,
      },
      bouquet: {
        type: Sequelize.ENUM,
        values: ['basic', 'moderate', 'premium'],
      },
      status: {
        type: Sequelize.ENUM,
        values: ['active', 'inactive', 'dormant'],
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
    await queryInterface.dropTable('HotelRestos');
  },
};
