'use strict';
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'SubCategories',
      [
        {
          id: "7ae2acc3-c954-4649-a6c8-a38dd1934f12",
          name: 'Sugar Cake',
          categoryId: 'fcab72e6-9238-4e97-846c-00c1d839e7a0',
          clientId:'c93a072d-45c9-432a-b1ca-850a76b53908',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('SubCategories', null, {});
     
  }
};
