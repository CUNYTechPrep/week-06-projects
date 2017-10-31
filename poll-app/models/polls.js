module.exports = (sequelize, DataTypes) => {

  const Polls = sequelize.define('Polls', {
    question: DataTypes.STRING
  },{
    hooks:{
      beforeDestroy: (poll) => {
        console.log("------- before destroy --------");
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
