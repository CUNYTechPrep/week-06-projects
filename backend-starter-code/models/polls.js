module.exports = (sequelize, DataTypes) => {
  var Polls = sequelize.define('Polls', {
    question: DataTypes.STRING
  });

  Polls.associate = (models) => {
    models.Polls.hasMany(models.Choices);
  }

  return Polls;
};
