const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING,
    });

    Users.beforeCreate((user) =>
        new sequelize.Promise((resolve) => {
            bcrypt.hash(user.password_hash, null, null, (err, hashedPassword) => {
                resolve(hashedPassword);
            });
        }).then((hashedPw) => {
            user.password_hash = hashedPw;
        })
    );

    return Users;
}