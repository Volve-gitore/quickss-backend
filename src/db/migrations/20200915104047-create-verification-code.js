'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VerificationCodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "cascade",
        onDelete: "cascade",
        references: { model: "Users", key: "id" }
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      console.log('created VerificationCodes table');
      return queryInterface.sequelize.query(`
        CREATE EVENT expireToken
        ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL  1 DAY 
        DO
        DELETE FROM verification_codes WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 DAY);
        `)
    }).then(() => { console.log('expireToken event created') });
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('VerificationCodes')
	  .then(() => {
	    console.log('VerificationCodes table dropped')
	    return queryInterface.sequelize.query(`DROP EVENT IF EXISTS  expireToken`);
    }).then(() => { console.log('expireToken event dropped') })
  }
};