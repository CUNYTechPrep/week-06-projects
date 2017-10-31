module.exports = (sequelize, DataTypes) => {

  const Polls = sequelize.define('Polls', {
    question: DataTypes.STRING
  },{
    hooks:{
      beforeDestroy: function(poll){
        console.log("------- before destroy --------");
        return models.Choices.destroy({
          where: {
            PollId: poll.id
          }
        })
      },
      afterDestroy: function(instance, options, cb) {
        console.log('after destroy');
        return cb();
      }
    }
  });

  Polls.associate = (models) => {
    models.Polls.hasMany(models.Choices);
  }

  return Polls;
};
