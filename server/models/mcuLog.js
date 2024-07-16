"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class McuLog extends Model {
        static associate(models) {
            this.belongsTo(models.Mcu, {
                foreignKey: "mcuId",
                sourceKey: "id",
                as: "mcu"
            });
        }
    }
    McuLog.init(
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
            data: {
                allowNull: true,
                type: DataTypes.JSON
            },
            deletedAt: DataTypes.DATE
        },
        {
            sequelize,
            modelName: "McuLog"
        }
    );

    return McuLog;
};
