'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fb_id: DataTypes.STRING,
    access_token: DataTypes.TEXT,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.TEXT,
    profilePictureURL: DataTypes.TEXT,
    library: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};