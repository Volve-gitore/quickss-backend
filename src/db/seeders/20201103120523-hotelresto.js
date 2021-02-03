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
          images: ["https://res.cloudinary.com/dp1abfk0j/image/upload/v1605625252/g9ufpvhzr4pxaabqxwwz.jpg"],
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
