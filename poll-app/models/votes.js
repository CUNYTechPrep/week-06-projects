module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    user: DataTypes.STRING,
  });

  Votes.associate = (models) => {
    models.Votes.belongsTo(models.Choices);
  };

  return Votes;
};
