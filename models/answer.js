'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('answers', {
  }, {
    classMethods: {
      associate: function(db) {
        db.answers.belongsTo(db.users);
        db.answers.belongsTo(db.polls);
        db.answers.belongsTo(db.choices);
      }
    }
  }, {
    underscored: true
  });
  return Answer;
};