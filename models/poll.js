'use strict';
module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('polls', {
    question: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(db) {
        db.polls.hasMany(db.choices);
      }
    },
    underscored: true    
  });
  return Poll;
};