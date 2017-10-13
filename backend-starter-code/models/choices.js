module.exports = (sequelize, DataTypes) => {
   // giva a name "Post" to model
   const Choices = sequelize.define('Choices', {
      // List of all the columns: post and author
      // id, create_a are automaticly created
      body: DataTypes.STRING,
   });

  Choices.associate = (models) => {
     models.Choices.hasMany(models.Votes);
     models.Choices.belongsTo(models.Polls); // Add a poll id to Choices model
  }

  return Choices;
};
