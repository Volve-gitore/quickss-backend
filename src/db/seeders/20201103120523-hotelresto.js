'use strict';
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'HotelRestos',
      [
        {
          name: 'quickss-hotel',
          category: 'hotel',
          description: 'the best hotel ever',
          bouquet: 'basic',
          status: 'active',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('HotelRestos', null, {});
  },
};
