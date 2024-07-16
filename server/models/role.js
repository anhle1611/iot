"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.User, {
                through: "User_Roles",
                foreignKey: "roleId",
                as: "users"
            });
        }
    }
    Role.init(
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
            modelName: "Role"
        }
    );

    return Role;
};
