module.exports = (sequelize, DataTypes) => {
  var Questions = sequelize.define('Questions', {
    question: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        models.Questions.hasMany(models.Choices);
      }
    }
  });
  return Questions;
};