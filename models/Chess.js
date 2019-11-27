// using socket io for this great video reference for socket.io and nodemon https://www.youtube.com/watch?v=rxzOqP9YwmM
module.exports = function (sequelize, DataTypes) {
    var Chess = sequelize.define("Chess", {
        gameID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        player1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        player2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "waiting"
        },
    });
    return Chess;


};