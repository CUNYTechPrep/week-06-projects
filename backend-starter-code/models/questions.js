module.exports = (sequelize, DataTypes) => {
  var Polls = sequelize.define('Polls', {
    question: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Polls.hasMany(models.Choices);
      }
    }
  });
  return Polls;
};