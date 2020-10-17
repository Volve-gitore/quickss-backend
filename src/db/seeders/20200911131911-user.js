'use strict';

const bcrypt = require('bcrypt');
const moment = require('moment');

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
          isVerified: true,
          role: 'client',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
        {
          firstName: 'unverified',
          lastName: 'User',
          username: 'unverified_user',
          email: 'unverified_user@test.com',
          passkey: bcrypt.hashSync('Test@Quickss12345!', 10),
          phoneNo: '0700000001',
          isVerified: false,
          role: 'client',
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
