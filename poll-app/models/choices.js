module.exports = (sequelize, DataTypes) => {
  const Choices = sequelize.define('Choices', {
    description: DataTypes.STRING,
    numVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  Choices.associate = (models) => {
    // models.Choices.hasMany(models.Votes);
    models.Choices.belongsTo(models.Polls);
  }

  return Choices;
};
