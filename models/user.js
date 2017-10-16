'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    email: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(db) {
        db.users.hasMany(db.answers);
      }
    },
    underscored: true
  });
  return User;
};