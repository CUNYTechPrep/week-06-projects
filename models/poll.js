'use strict';
module.exports = (sequelize, DataTypes) => {
  var Poll = sequelize.define('Poll', {
    question: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.Poll.hasMany(models.Choices);
      }
    }
  });
  return Poll;
};