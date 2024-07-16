"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class RoomLog extends Model {
        static associate(models) {
            this.belongsTo(models.Room, {
                foreignKey: "roomId",
                sourceKey: "id",
                as: "room"
            });
        }
    }
    RoomLog.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            roomId: {
                allowNull: false,
                type: DataTypes.STRING(255)
            },
            event: DataTypes.STRING(255),
            message: DataTypes.JSON,
            deletedAt: DataTypes.DATE
        },
        {
            sequelize,
            modelName: "RoomLog"
        }
    );

    return RoomLog;
};
