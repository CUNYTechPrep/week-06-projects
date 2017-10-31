module.exports = (sequelize, DataTypes) => {
  const Polls = sequelize.define('Polls', {
    question: DataTypes.STRING
  },{
    hooks:{
      beforeDestroy: function(poll){
        return models.Choices.destroy({
          where: {
            PollId: poll.id
          }
        })
      }
    }
  });

  Polls.associate = (models) => {
    models.Polls.hasMany(models.Choices);
  }

  return Polls;
};
