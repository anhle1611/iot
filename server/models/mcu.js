"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Mcu extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Room, {
                foreignKey: "roomId",
                targetKey: "id",
                as: "room"
            });
            this.hasMany(models.McuLog, {
                foreignKey: "mcuId",
                sourceKey: "id",
                as: "mcuLogs"
            });
            this.hasMany(models.McuSetting, {
                foreignKey: "mcuId",
                sourceKey: "id",
                as: "mcuSettings"
            });
        }
    }
    try {
        Mcu.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: DataTypes.STRING(255),
                status: {
                    allowNull: false,
                    type: DataTypes.INTEGER,
                    defaultValue: 1
                },
                deletedAt: DataTypes.DATE,
                roomId: {
                    allowNull: false,
                    type: DataTypes.STRING(255)
                },
                socketId: DataTypes.STRING(255),
                code: DataTypes.STRING(255),
            },
            {
                sequelize,
                modelName: "Mcu"
            }
        );
    } catch (error) {
        console.log(error)
    }
    

    return Mcu;
};
