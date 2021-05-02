'use strict';
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('ProductGroups', [{
        productId: '1',
        groupId:'1'
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('ProductGroups', null, {});
     
  }
};
