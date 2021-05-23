'use strict';
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'Products',
      [
        {
          id: "0efee51d-e325-4570-95d2-8d4ce2a1e709",
          name: 'Cake',
          type: '269bb701-9251-40df-bfb4-b135cef9150c',
          price: '1000',
          flag: '1',
          clientId: 'c93a072d-45c9-432a-b1ca-850a76b53908',
          groupId: '27f84d58-6e89-4ebd-ab81-9cbb2ebe3e8f',
          categoryId: 'fcab72e6-9238-4e97-846c-00c1d839e7a0',
          subCategoryId: '7ae2acc3-c954-4649-a6c8-a38dd1934f12',
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
