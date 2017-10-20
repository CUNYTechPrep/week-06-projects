'use strict';

module.exports = (sequelize, DataTypes) => {
    const Poll = sequelize.define('polls', { 
        question: DataTypes.STRING,
        author: DataTypes.STRING
    }, { 
        underscored: true
    });

    Poll.associate = function(db) {
        Poll.hasMany(db.choices);
    };

  return Poll;
};
