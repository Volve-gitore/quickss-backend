'use strict';
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'Products',
      [
        {
          productId: 'P0009',
          name: 'Cake',
          type: 'food',
          price: '1000',
          flag: '1',
          hotelRestoId: '1',
          groupId: '1',
          categoryId: '1',
          subCategoryId: '1',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
