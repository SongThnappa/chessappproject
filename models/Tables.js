//might change this model after going through the socket.io example

module.exports = function (sequelize, DataTypes) {
    var Tables = sequelize.define("Tables", {
        gameID: {
            type: DataTypes.STRING,
            allowNull: false,
         
        },
        Player1: {
            type: DataTypes.STRING,
            allowNull: false,
         
        },
        Player2: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Waiting on Player"
           
        },

    });
    return Tables;
};