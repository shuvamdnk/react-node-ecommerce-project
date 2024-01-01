"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
// Controllers
const LoginController_1 = require("../controller/LoginController");
const HomeController_1 = require("../controller/HomeController");
const StudentController_1 = require("../controller/StudentController");
// Validation
const validation_1 = require("../validation/validation");
// Middleware 
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
// routes   
route.get('/', (req, res, next) => {
    res.redirect('/login');
});
route.get('/login', auth_1.guest, LoginController_1.LoginPage);
route.get('/register', auth_1.guest, LoginController_1.RegisterPage);
route.post('/login', auth_1.guest, (0, validation_1.loginValidationRules)(), LoginController_1.LoginAction);
route.post('/register', auth_1.guest, (0, validation_1.signupValidationRules)(), LoginController_1.RegisterAction);
route.get('/logout', auth_1.auth, LoginController_1.Logout);
route.get('/dashboard', auth_1.auth, HomeController_1.dashboard);
route.get('/student', auth_1.auth, StudentController_1.StudentIndex);
route.get('/add-student', auth_1.auth, StudentController_1.StudentCreate);
route.post('/store-student', auth_1.auth, (0, validation_1.StudentStoreRules)(), StudentController_1.StudentStore);
route.get('/student-delete/:id', auth_1.auth, StudentController_1.StudentDelete);
route.get('/student-edit', auth_1.auth, StudentController_1.StudentEdit);
route.post('/student-update', auth_1.auth, (0, validation_1.StudentUpdateRules)(), StudentController_1.StudentUpdate);
exports.default = route;
