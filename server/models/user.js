module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fb_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    access_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.TEXT
    },
    last_name : { 
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.TEXT
    },
    profilePictureURL: {
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      
    },
  });

  return User;
}