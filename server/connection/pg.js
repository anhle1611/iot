const Sequelize = require("sequelize");
const config = require("../config/db");

const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

let sequelize;
if (config.url) {
    sequelize = new Sequelize(config.url, { ...config, operatorsAliases });
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        { ...config, operatorsAliases }
    );
}

try {
    sequelize.authenticate().then(() => {
        console.log("Connection has been established successfully.");
    });
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
