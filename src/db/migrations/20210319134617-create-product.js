'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      type:{
        type: Sequelize.UUID,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Types', key: 'id' },
      },
      currency: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DOUBLE,
      },
      clientId: {
        type: Sequelize.UUID,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Clients', key: 'id' },
      },
      groupId: {
        type: Sequelize.UUID,
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'Groups', key: 'id' },
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'Categories', key: 'id' },
      },
      subCategoryId: {
        type: Sequelize.UUID,
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'SubCategories', key: 'id' },
      },
      flag: {
        type: Sequelize.INTEGER,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      description: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Products');
  },
};
