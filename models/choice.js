'use strict';
module.exports = (sequelize, DataTypes) => {
  const Choice = sequelize.define('choices', {
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(db) {
        db.choices.belongsTo(db.polls);
      }
    }
  }, {
    underscored: true,
    timestamps: false
  });
  return Choice;
};