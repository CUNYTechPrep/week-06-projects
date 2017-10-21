'use strict';

module.exports = (sequelize, DataTypes) => {
    const Choice = sequelize.define('choices', {
        description: DataTypes.STRING
    }, {
        underscored: true,
        timestamps: false
    });

    Choice.associate = function(db) {
        Choice.belongsTo(db.polls)
    };

    return Choice;
};