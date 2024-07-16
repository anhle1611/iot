"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.Role, {
                through: "User_Roles",
                foreignKey: "userId",
                as: "roles"
            });
            this.belongsTo(models.Room, {
                foreignKey: "roomId",
                targetKey: "id",
                as: "room"
            });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: DataTypes.STRING(255),
            password: DataTypes.STRING(1000),
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
            socketId: DataTypes.STRING(255)
        },
        {
            sequelize,
            modelName: "User"
        }
    );

    return User;
};
