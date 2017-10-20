module.exports = (sequelize, DataTypes) => {
  const Polls = sequelize.define('Polls', {
    question: DataTypes.STRING
    choices: DataTypes.STRING
  });


  Polls.associate = (models) => {
    models.Polls.hasMany(models.Choices);
  }

  return Polls;
};

