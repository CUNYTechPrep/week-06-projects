module.exports = (sequelize, DataTypes) => {
   // giva a name "Post" to model
   const Polls = sequelize.define('Polls', {
      // List of all the columns: post and author
      // id, create_a are automaticly created
      question: DataTypes.STRING,
   });

  Polls.associate = (models) => {
     models.Polls.hasMany(models.Choices);
  }

  return Polls;
};
