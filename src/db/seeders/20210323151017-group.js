'use strict';
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return await queryInterface.bulkInsert(
      'Groups',
      [
        {
          id: "27f84d58-6e89-4ebd-ab81-9cbb2ebe3e8f",
          name: 'lunch',
          clientId:'c93a072d-45c9-432a-b1ca-850a76b53908',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
      ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Groups', null, {});
    
  }
};
