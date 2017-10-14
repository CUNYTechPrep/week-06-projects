module.exports = (sequelize, DataTypes) => {
  const Polls = sequelize.define('Polls', {
    question: DataTypes.STRING
  });

  Polls.associate = (models) => {
    // update Polls relation so deletions cascade
    models.Polls.hasMany(models.Choices,
                         { onDelete: 'cascade', hooks: 'true' });
  }

  return Polls;
};

