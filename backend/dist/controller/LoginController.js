"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.RegisterAction = exports.LoginAction = exports.RegisterPage = exports.LoginPage = void 0;
const Admin_1 = require("../models/Admin");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const JWT_SECRET = String(process.env.JWT_SECRET || 'secret');
const issuer = 'ts-node';
const algorithm = 'HS256';
const LoginPage = (req, res, next) => {
    res.render('login', {
        page: 'Login',
        layout: 'layouts/app',
        currentUrl: req.originalUrl,
    });
};
exports.LoginPage = LoginPage;
const RegisterPage = (req, res, next) => {
    res.render('register', {
        page: 'Register',
        layout: 'layouts/app',
        currentUrl: req.originalUrl,
    });
};
exports.RegisterPage = RegisterPage;
const LoginAction = async (req, res, next) => {
    let { email, password } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    try {
        let user = await Admin_1.Admin.findOne({
            where: {
                email: email
            }
        });
        if (user) {
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            const options = {
                issuer,
                algorithm,
                expiresIn: '10d',
            };
            const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
            return res.cookie("access_token", token, {
                httpOnly: true,
            }).status(200).json({
                'status': 200,
                'success': 'Login Successful'
            });
        }
    }
    catch (error) {
        return res.json({ 'status': 401, 'error': 'Error' });
    }
};
exports.LoginAction = LoginAction;
const RegisterAction = async (req, res, next) => {
    let { name, email, password } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    try {
        let user = await Admin_1.Admin.create({
            name: name,
            email: email,
            password: await bcryptjs_1.default.hash(password, 10)
        });
        res.json({
            "status": 200,
            "success": "Registration Successful."
        });
    }
    catch (error) {
        res.json({
            "status": 401,
            "errors": error
        });
    }
};
exports.RegisterAction = RegisterAction;
const Logout = async (req, res, next) => {
    res.clearCookie("access_token").status(200);
    res.redirect('/login');
};
exports.Logout = Logout;
