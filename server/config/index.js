"use strict";

require("dotenv").config();
const pgsql = require("./db");

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    common: {
        appKey: process.env.APP_KEY,
        adminSecretKey: process.env.ADMIN_SECRET_KEY,
        limit: process.env.LIMIT || 20,
        fileUploadLimit: parseInt(process.env.FILE_UPLOAD_LIMIT),
        secondOfDay: 86400,
        gmtMiliSecond: 25200000,
        maxArea: 30000
    },
    database: {
        mongodb: {
            uri: process.env.DB_URI
        },
        pgsql,
        geometryCrs: 4326
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRESIN
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        expireTime: parseInt(process.env.REDIS_EXPIRE_TIME) || 86400,
        db: process.env.REDIS_DB || 0
    },
    timezone: "Asia/Ho_Chi_Minh",
    dateTimeFormat: "dd/MM/yyyy HH:mm",
    dateFormat: "dd/MM/yyyy",
};
