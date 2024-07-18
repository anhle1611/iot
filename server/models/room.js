"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.User, {
                foreignKey: "roomId",
                sourceKey: "id",
                as: "users"
            });
            this.hasMany(models.Mcu, {
                foreignKey: "roomId",
                sourceKey: "id",
                as: "mcus"
            });
            this.hasMany(models.McuLog, {
                foreignKey: "roomId",
                sourceKey: "id",
                as: "mcuLogs"
            });
            this.hasMany(models.McuSetting, {
                foreignKey: "roomId",
                sourceKey: "id",
                as: "mcuSettings"
            });
        }
    }
    Room.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            code: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING(50)
            },
            status: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            deletedAt: DataTypes.DATE
        },
        {
            sequelize,
            modelName: "Room"
        }
    );

    return Room;
};
