'use strict';

const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'Users',
      [
        {
          fullName: 'Test User',
          email: 'testuser@test.com',
          passkey: bcrypt.hashSync('Test@Quickss12345!', 10),
          phoneNo: '+250782057791',
          isVerified: true,
          role: 'client',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
        {
          fullName: 'unverified user',
          email: 'unverified_user@test.com',
          passkey: bcrypt.hashSync('Test@Quickss12345!', 10),
          phoneNo: '+250700000001',
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
