module.exports = (sequelize, DataTypes) => {
  const Choices = sequelize.define('Choices', {
    body:DataTypes.STRING,
    PollID:{
      type:DataTypes.INTEGER,
      references:{
        model:'Polls',
        key:'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Choices
      }
    }
  });
  return Choices;
};