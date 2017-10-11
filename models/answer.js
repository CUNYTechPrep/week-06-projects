'use strict';
module.exports = (sequelize, DataTypes) => {
  var Answer = sequelize.define('Answer', {
  }, {
    classMethods: {
      associate: function(models) {
        models.Answer.belongsTo(models.User);
        models.Answer.belongsTo(models.Poll);
        models.Answer.belongsTo(models.Choice);
      }
    }
  });
  return Answer;
};