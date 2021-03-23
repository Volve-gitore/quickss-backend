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
    await queryInterface.dropTable('Clients');
  },
};
