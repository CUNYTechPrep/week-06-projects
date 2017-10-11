'use strict';
module.exports = (sequelize, DataTypes) => {
  var Choice = sequelize.define('Choice', {
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.Choice.belongsTo(models.Poll);
      }
    }
  });
  return Choice;
};