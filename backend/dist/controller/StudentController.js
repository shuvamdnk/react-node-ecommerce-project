"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentDelete = exports.StudentUpdate = exports.StudentEdit = exports.StudentStore = exports.StudentCreate = exports.StudentIndex = void 0;
const Student_1 = require("../models/Student");
const Users_1 = require("../models/Users");
const express_validator_1 = require("express-validator");
const StudentIndex = async (req, res, next) => {
    const data = await Users_1.User.findAll();
    res.render('admin/student', {
        page: 'Students',
        layout: 'layouts/main',
        currentUrl: req.originalUrl,
        students: data
    });
    // res.json({
    //     status:"success",
    //     // users:data
    // }) 
};
exports.StudentIndex = StudentIndex;
const StudentCreate = async (req, res, next) => {
    res.render('admin/add-student', {
        page: 'Add Student',
        layout: 'layouts/main',
        currentUrl: req.originalUrl,
    });
};
exports.StudentCreate = StudentCreate;
const StudentStore = async (req, res, next) => {
    const { name, email, phone, stream, gender, address } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    try {
        let student = await Student_1.Student.create({
            name: name,
            email: email,
            phone: phone,
            gender: gender,
            stream: stream,
            address: address
        });
        res.json({
            "status": 200,
            "success": "Student Added Successful."
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
        const student = await Student_1.Student.findOne({
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
        const student = await Student_1.Student.update({
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
const StudentDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const student = await Student_1.Student.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/student');
    }
    catch (error) {
        res.json({
            "status": 401,
            "errors": error
        });
    }
};
exports.StudentDelete = StudentDelete;
