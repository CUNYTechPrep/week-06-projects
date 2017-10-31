module.exports = (sequelize, DataTypes) => {
  const Polls = sequelize.define('Polls', {
    question: DataTypes.STRING
  },{
    hooks:{
      beforeDestroy: function(poll){
        console.log("-------before destroy hook ran--------");
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
