const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  var Login = sequelize.define("Login", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    userID: {
      type: DataTypes.STRING,
      defaultValue: ""

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 20]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 20]
      }
    },
    loginStatus: {
      type: DataTypes.STRING,
      defaultValue: "signedOff"
    },



  });
  // https://sequelize.org/master/manual/hooks.html
  // https://www.npmjs.com/package/bcrypt

  Login.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(13);
    return bcrypt.hash(user.password, salt)
      .then(hash => {
        user.password = hash;
      })
      .catch(err => {
        throw err;
      });
  });

  Login.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(3);
    return bcrypt.hash(user.email, salt)
      .then(hash => {
        user.userID = hash;
      })
      .catch(err => {
        throw err;
      });
  });

  Login.prototype.validPassword = function (password) {

    return bcrypt.compare(password, this.password)
  }
  // validPassword = async (password, hashedPasswords, cb) =>{
  //   bcrypt.compare(password, hashedPassword, (err, isMatch)=> {
  //     if(err){
  //       throw err
  //     }
  //     return( null, isMatch)
  //   });
  // }

  return Login;
};