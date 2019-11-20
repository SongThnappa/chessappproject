module.exports = function (sequelize, DataTypes) {
  var Login = sequelize.define("Login", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
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
    }
  });

  
  return Login;
};