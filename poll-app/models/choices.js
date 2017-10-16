module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
	const Choices = sequelize.define('Choices', {
		body: DataTypes.STRING
	});

	Choices.associate = (models) => {
		models.Choices.belongsTo(models.Polls);
	}

	return Choices;
};
=======
  const Choices = sequelize.define('Choices', {
    description: DataTypes.STRING
  });

  Choices.associate = (models) => {
    // models.Choices.hasMany(models.Votes);
    models.Choices.belongsTo(models.Polls);
  }

  return Choices;
};
>>>>>>> f13f4451ce7014c2bcbee2c40be85b72e43619c4
