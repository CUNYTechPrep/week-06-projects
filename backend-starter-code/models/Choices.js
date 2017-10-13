module.exports = (sequelize, DataTypes) => {
  var Choices = sequelize.define('Choices', {
    description: DataTypes.STRING,
    count: DataTypes.INTEGER
  });

  Choices.associate = (models) => {
    models.Choices.belongsTo(models.Polls);
  }

  return Choices;
};
