module.exports = (sequelize, DataTypes) => {
  const Choices = sequelize.define('Choices', {
    description: DataTypes.STRING
  });

  Choices.associate = (models) => {
    // models.Choices.hasMany(models.Votes);
    models.Choices.belongsTo(models.Polls);
  }

  return Choices;
};
