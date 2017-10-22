//const bcrypt = require('bcrypt-nodejs');


module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    getterMethods: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
        }
    }
  });


    Users.beforeCreate((user) =>
      new sequelize.Promise((resolve) => {
        bcrypt.hash(user.password, null, null, (err, hashedPassword) => {
          resolve(hashedPassword);
        });
      }).then((hashedPw) => {
          user.password_hash = hashedPw;
      })
    );

    return Users;
};