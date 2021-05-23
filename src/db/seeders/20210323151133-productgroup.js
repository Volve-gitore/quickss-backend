'use strict';
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('ProductGroups', [{
        id: "427f4438-4854-4602-b3e7-93d4e2059c04",
        productId: '0efee51d-e325-4570-95d2-8d4ce2a1e709',
        groupId:'27f84d58-6e89-4ebd-ab81-9cbb2ebe3e8f',
        createdAt: moment.utc().format(),
        updatedAt: moment.utc().format(),
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('ProductGroups', null, {});
     
  }
};
