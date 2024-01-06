"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const mysql2_1 = __importDefault(require("mysql2"));
dotenv_1.default.config();
const connection = mysql2_1.default.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
});
const result = connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}`, (err, results) => {
    if (err) {
        console.log('Error => ', err);
        return;
    }
    return results;
    // console.log(results);
});
// console.log('Database', result);
const sequelize = new sequelize_typescript_1.Sequelize(String(process.env.DATABASE_NAME), String(process.env.DATABASE_USERNAME), process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: false
});
if (result) {
    sequelize.authenticate()
        .then(() => {
        console.log('Database connected.');
    })
        .catch((err) => {
        console.error('Unable to connect to the database:' + err);
    });
}
exports.default = sequelize;
