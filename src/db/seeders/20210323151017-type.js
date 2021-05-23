'use strict';
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return await queryInterface.bulkInsert(
      'Types',
      [
        {
          id: "269bb701-9251-40df-bfb4-b135cef9150c",
          name: 'food',
          clientId:'c93a072d-45c9-432a-b1ca-850a76b53908',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
      ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Types', null, {});
    
  }
};
