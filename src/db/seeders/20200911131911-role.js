'use strict';

const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'Roles',
      [
        {
            id: "269bb701-9251-40df-bfb4-b135cef9150c",
            name: "client",
            createdAt: moment.utc().format(),
            updatedAt: moment.utc().format(),
        },
        {
            id: "3ff6e861-634c-46da-bf2e-638232c595a6",
            name: "admin",
            createdAt: moment.utc().format(),
            updatedAt: moment.utc().format(),
        },
        {
            id: "4ab132c7-00bb-4f81-abbf-9f509d21f3d7",
            name: "customer",
            createdAt: moment.utc().format(),
            updatedAt: moment.utc().format(),
        }
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Roles', null, {});
  },
};
