'use strict';
module.exports = (sequelize, DataTypes) => {
  var Poll = sequelize.define('Poll', {
    question: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Poll;
};