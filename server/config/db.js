require("dotenv").config();

module.exports = {
    // url: `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PG_PORT}/${process.env.DATABASE}?schema=${process.env.SCHEMA}`,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    schema: process.env.PG_SCHEMA,
    define: {
        schema: process.env.PG_SCHEMA,
        timestamps: true
    },
    dialect: "postgres",
    logging: process.env.NODE_ENV == "localhost"
};
