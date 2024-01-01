"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentUpdate = exports.StudentEdit = exports.StudentStore = exports.StudentCreate = exports.UserVerify = exports.UserLogin = exports.UserRegistration = void 0;
const Users_1 = require("../models/Users");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = String(process.env.JWT_API_SECRET || 'secret');
const issuer = 'ts-node';
const algorithm = 'HS256';
const UserRegistration = async (req, res, next) => {
    const { name, email, phone, password } = req.body;
    console.log(name, email, phone, password);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    try {
        let user = await Users_1.User.create({
            name: name,
            email: email,
            phone: phone,
            password: await bcryptjs_1.default.hash(password, 10)
        });
        res.status(201).json({
            code: 201,
            status: "success",
            message: "Registration Successful."
        });
    }
    catch (error) {
        console.log(error);
        res.status(409).json({
            code: 409,
            status: "error",
            message: "Registration failed."
        });
    }
};
exports.UserRegistration = UserRegistration;
const UserLogin = async (req, res, next) => {
    let { email } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    try {
        let user = await Users_1.User.findOne({
            where: {
                email: email
            }
        });
        if (user) {
            const payload = {
                id: user.id,
            };
            const options = {
                issuer,
                algorithm,
                expiresIn: '10d',
            };
            const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
            const date = new Date();
            return res.status(200).json({
                code: 200,
                status: "success",
                message: "Login Successful.",
                access_token: token,
                token_type: 'Bearer',
                generatedAt: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                expiresIn: '10d',
            });
        }
    }
    catch (error) {
        res.status(401).json({
            code: 401,
            status: "Unauthorized",
            message: "Login failed."
        });
    }
};
exports.UserLogin = UserLogin;
const UserVerify = async (req, res, next) => {
    res.status(200).json({
        code: 200,
        status: "success",
    });
};
exports.UserVerify = UserVerify;
const StudentCreate = async (req, res, next) => {
    res.render('admin/add-student', {
        page: 'Add Student',
        layout: 'layouts/main',
        currentUrl: req.originalUrl,
    });
};
exports.StudentCreate = StudentCreate;
const StudentStore = async (req, res, next) => {
    const { name, email, phone } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    try {
        let student = await Users_1.User.create({
            name: name,
            email: email,
            phone: phone,
        });
        res.json({
            "status": 200,
            "success": "User Added Successful."
        });
    }
    catch (error) {
        res.json({
            "status": 401,
            "errors": error
        });
    }
};
exports.StudentStore = StudentStore;
const StudentEdit = async (req, res, next) => {
    try {
        var { id } = req.query;
        if (typeof id == 'undefined') {
            return res.redirect('/student');
        }
        const student = await Users_1.User.findOne({
            where: {
                id: id
            }
        });
        if (student) {
            return res.render('admin/edit-student', {
                page: 'Edit Student',
                layout: 'layouts/main',
                currentUrl: req.originalUrl,
                student: student
            });
        }
        else {
            return res.redirect('/student');
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            "status": 401,
            "errors": error
        });
    }
};
exports.StudentEdit = StudentEdit;
const StudentUpdate = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    try {
        const { name, email, phone, stream, gender, address, id } = req.body;
        const student = await Users_1.User.update({
            name: name,
            email: email,
            phone: phone,
            gender: gender,
            stream: stream,
            address: address
        }, {
            where: {
                id: id
            }
        });
        res.json({
            "status": 200,
            "success": "Student Updated Successful."
        });
    }
    catch (error) {
        res.json({
            "status": 401,
            "errors": error
        });
    }
};
exports.StudentUpdate = StudentUpdate;
// export const StudentDelete: RequestHandler = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const student = await Student.destroy({
//             where: {
//                 id: id
//             }
//         })
//         res.redirect('/student');
//     } catch (error) {
//         res.json({
//             "status": 401,
//             "errors": error
//         });
//     }
// }
