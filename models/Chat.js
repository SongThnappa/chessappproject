// using socket io for this great video reference for socket.io and nodemon https://www.youtube.com/watch?v=rxzOqP9YwmM
module.exports = function (sequelize, DataTypes) {
    var Chat = sequelize.define("Chat", {
        test: {
            type: DataTypes.STRING,
            allowNull: false,


        }
    });
    return Chat;


};