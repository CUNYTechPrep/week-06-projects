module.exports = (sequelize, DataTypes) => {
  var Choices = sequelize.define('Choices', {
    description: DataTypes.STRING,
    count: DataTypes.INTEGER
  });

  // Include foreignKey and onDelete on this side of the relationship
  // for cascade delete to work. When you delete a poll, all assoicated choices
  // will be deleted as well.
  Choices.associate = (models) => {
    models.Choices.belongsTo(models.Polls, {
      foreignKey: 'PollId',
      onDelete: 'cascade'
    });
  }

  return Choices;
};
