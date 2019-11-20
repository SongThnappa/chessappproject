//might change this model after going through the socket.io example

module.exports = function (sequelize, DataTypes) {
    var Tables = sequelize.define("Tables", {
        dateID: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        date1_firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        date2_firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

    });
    return Tables;
};