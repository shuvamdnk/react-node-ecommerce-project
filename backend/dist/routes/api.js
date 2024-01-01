"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiRoute = (0, express_1.Router)();
// Controllers
const UserController_1 = require("../controller/UserController");
// Validation
const apiValidation_1 = require("../validation/apiValidation");
// Middleware 
const apiAuth_1 = require("../middleware/apiAuth");
const multer_1 = __importDefault(require("multer"));
const form_data = (0, multer_1.default)();
// api routes
/****************  Non auth routes ******************/
// User login / register
apiRoute.post('/auth/login', form_data.any(), (0, apiValidation_1.loginValidationRules)(), UserController_1.UserLogin);
apiRoute.post('/auth/register', form_data.any(), (0, apiValidation_1.signupValidationRules)(), UserController_1.UserRegistration);
/**************** auth routes ******************/
apiRoute.get('/auth/verify', form_data.any(), apiAuth_1.auth, UserController_1.UserVerify);
exports.default = apiRoute;
