'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fb_id: {
        type: Sequelize.STRING
      },
      access_token: {
        type: Sequelize.TEXT
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.TEXT
      },
      profilePictureURL: {
        type: Sequelize.TEXT
      },
      address_1: {
        type: Sequelize.TEXT 
      },
      city: {
        type: Sequelize.STRING 
      },
      zip: { 
        type: Sequelize.STRING
      },
      country: { 
        type: Sequelize.STRING 
      },
      library: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};