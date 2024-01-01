"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize(String(process.env.DATABASE_NAME), String(process.env.DATABASE_USERNAME), process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: false
});
// const sequelize = new Sequelize({
//     database: 'my_database',
//     dialect: 'mysql',
//     username: 'my_username',
//     password: 'my_password',
// });
sequelize.authenticate()
    .then(() => {
    console.log('Database connected.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:' + err);
});
exports.default = sequelize;
