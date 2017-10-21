module.exports = (sequelize, DataTypes) => {
   // giva a name "Post" to model
   const Votes = sequelize.define('Votes', {
      // List of all the columns: post and author
      // id, create_a are automaticly created
      answer: DataTypes.STRING,
   });

  Votes.associate = (models) => {
     models.Votes.belongsTo(models.Choices);
  }

  return Votes;
};
