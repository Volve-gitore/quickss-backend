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
          password: bcrypt.hashSync('Test@Quickss12345!', 10),
          phoneNo: '+250782057791',
          isVerified: true,
          roleId: '269bb701-9251-40df-bfb4-b135cef9150c',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
        {
          id: "f4e3e874-615b-41dd-a78b-255c1bdb585a",
          fullName: 'unverified user',
          email: 'unverified_user@test.com',
          password: bcrypt.hashSync('Test@Quickss12345!', 10),
          phoneNo: '+250700000001',
          isVerified: false,
          roleId: '269bb701-9251-40df-bfb4-b135cef9150c',
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
        {
          id: "c93a072d-45c9-432a-b1ca-850a76b53908",
          fullName: "Blaise Irakoze",
          email: "blaise@gmail.com",
          password: bcrypt.hashSync("Blaise@123", 10),
          phoneNo: "+250788211579",
          isVerified: true,
          roleId: "3ff6e861-634c-46da-bf2e-638232c595a6",
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
        {
          id: "269bb701-9251-40df-bfb4-b135cef9150c",
          fullName: "Quikss Admin",
          email: "admin@gmail.com",
          password: bcrypt.hashSync("Admin@123", 10),
          phoneNo: "+250789999999",
          isVerified: true,
          roleId: "3ff6e861-634c-46da-bf2e-638232c595a6",
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
        {
          id: "fcab72e6-9238-4e97-846c-00c1d839e7a0",
          fullName: "Quikss Client",
          email: "client@gmail.com",
          password: bcrypt.hashSync("Client@123", 10),
          phoneNo: "+250788888888",
          isVerified: true,
          roleId: "269bb701-9251-40df-bfb4-b135cef9150c",
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        },
        {
          id: "427f4438-4854-4602-b3e7-93d4e2059c04",
          fullName: "Quikss Customer",
          email: "customer@gmail.com",
          password: bcrypt.hashSync("Customer@123", 10),
          phoneNo: "+250787777777",
          isVerified: true,
          roleId: "4ab132c7-00bb-4f81-abbf-9f509d21f3d7",
          createdAt: moment.utc().format(),
          updatedAt: moment.utc().format(),
        }
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Users', null, {});
  },
};
