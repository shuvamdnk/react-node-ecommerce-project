"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Student extends sequelize_1.Model {
}
exports.Student = Student;
Student.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    profile_pic: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    stream: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Student',
    tableName: 'students',
    timestamps: true
});
Student.sync({ force: false, alter: false })
    .then(() => {
    console.log("Student table sync.");
})
    .catch((err) => {
    console.log("some error occurs.." + err);
});
