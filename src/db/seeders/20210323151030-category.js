'use strict';
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: "fcab72e6-9238-4e97-846c-00c1d839e7a0",
          name: 'Cake',
          clientId:'c93a072d-45c9-432a-b1ca-850a76b53908',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
