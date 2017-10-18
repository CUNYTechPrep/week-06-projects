'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserQuestion = sequelize.define('UserQuestion', {
    text: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserQuestion;
};