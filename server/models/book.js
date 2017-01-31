'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    isbn: DataTypes.STRING,
    isbn13: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    avg_rating: DataTypes.DOUBLE,
    num_pages: DataTypes.INTEGER,
    publisher: DataTypes.STRING,
    gr_url: DataTypes.TEXT,

    owner: DataTypes.STRING,
    checked_out: DataTypes.BOOLEAN,
    checked_out_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    price: DataTypes.DOUBLE
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Book;
};