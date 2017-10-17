module.exports = (sequelize, DataTypes) => {
  var Choices = sequelize.define('Choices', {
    text: DataTypes.STRING,
    questionID: {
      type: DataTypes.INTEGER
      references: {
        model: 'Questions',
        key: 'id'
      }
    } 
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Choices.belongsTo(models.Questions);
      }
    }
  });
  return Choices;
};