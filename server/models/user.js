module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fb_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name : { 
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    profilePictureURL: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      
    },
  });

  return User;
}