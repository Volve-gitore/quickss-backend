const bcrypt = require('bcrypt');
const moment = require('moment');
('use strict');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Test',
          lastName: 'User',
          username: 'testUser',
          email: 'testuser@test.com',
          passkey: bcrypt.hashSync('Test@Quickss12345!', 10),
          phoneNo: '0700000000',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Users', null, {});
  },
};
