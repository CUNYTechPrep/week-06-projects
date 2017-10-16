module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
	const Polls = sequelize.define('Polls', {
		question: DataTypes.STRING
	});

	Polls.associate = (models) => {
		models.Polls.hasMany(models.Choices);
	}

	return Polls;
};
=======
  const Polls = sequelize.define('Polls', {
    question: DataTypes.STRING
  });

  Polls.associate = (models) => {
    models.Polls.hasMany(models.Choices);
  }

  return Polls;
};

>>>>>>> f13f4451ce7014c2bcbee2c40be85b72e43619c4
