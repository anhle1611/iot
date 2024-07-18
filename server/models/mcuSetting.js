"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class McuSetting extends Model {
        static associate(models) {
            this.belongsTo(models.Mcu, {
                foreignKey: "mcuId",
                sourceKey: "id",
                as: "mcu"
            });
        }
    }
    McuSetting.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            mcuId: {
                allowNull: true,
                type: DataTypes.STRING(255)
            },
            roomId: {
                allowNull: true,
                type: DataTypes.STRING(255)
            },
            configs: {
                allowNull: true,
                type: DataTypes.JSON
            },
            status: {
                allowNull: true,
                type: DataTypes.STRING(1000)
            },
            deletedAt: DataTypes.DATE
        },
        {
            sequelize,
            modelName: "McuSetting"
        }
    );

    return McuSetting;
};
