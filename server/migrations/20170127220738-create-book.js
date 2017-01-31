'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      isbn: {
        type: Sequelize.STRING
      },
      isbn13: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      image_url: {
        type: Sequelize.TEXT
      },
      avg_rating: {
        type: Sequelize.DOUBLE
      },
      num_pages: {
        type: Sequelize.INTEGER
      },
      publisher: {
        type: Sequelize.STRING
      },
      gr_url: {
        type: Sequelize.TEXT
      },
      owner: {
        allowNull: false,
        type: Sequelize.STRING
      },
      checked_out: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      checked_out_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      due_date: {
        allowNull:true,
        type: Sequelize.DATE
      },
      price: {
        allowNull: true,
        type: Sequelize.DOUBLE
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
    return queryInterface.dropTable('Books');
  }
};