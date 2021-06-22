'use strict';
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'Clients',
      [
        {
          id: "c93a072d-45c9-432a-b1ca-850a76b53908",
          name: 'Quiks Hotel',
          category: 'hotel',
          description: 'The best hotel ever',
          images: ["https://res.cloudinary.com/dp1abfk0j/image/upload/v1605627900/pvjplwgxhri208ilrdjy.jpg"],
          bouquet: 'basic',
          status: 'active',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },{
          id: "c93a072d-45c9-432a-b1ca-850a76b57908",
          name: 'Mariot',
          category: 'hotel',
          description: 'the best hotel in town',
          images: ["https://res.cloudinary.com/dp1abfk0j/image/upload/v1605625517/ngfqhphdy5m4ft0abdfr.jpg"],
          bouquet: 'premium',
          status: 'active',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
        {
          id: "c93a072d-45c9-432a-b1ca-850a76b12908",
          name: 'Ubumwe',
          category: 'resto',
          description: 'the best resto in town',
          images: ["https://res.cloudinary.com/dp1abfk0j/image/upload/v1605625252/g9ufpvhzr4pxaabqxwwz.jpg"],
          bouquet: 'premium',
          status: 'active',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clients', null, {});
  },
};
