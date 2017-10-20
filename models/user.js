'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        email: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        underscored: true
    });

    User.associate = function(db) {
        User.hasMany(db.answers);
    };

    return User;
};