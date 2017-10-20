'use strict';

module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define('answers', {}, {
      underscored: true
    });

    Answer.associate = function(db) {
        Answer.belongsTo(db.users);
        Answer.belongsTo(db.choices);
        Answer.belongsTo(db.polls);
    }

    return Answer;
};