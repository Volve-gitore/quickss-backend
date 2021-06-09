'use strict';

const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: "9e1ce00f-75cd-4f34-8fcc-c05c46d64f4d",
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
          id: "f4e3e874-615b-41dd-a78b-255c1bdb585a",
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
