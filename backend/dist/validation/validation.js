"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentUpdateRules = exports.StudentStoreRules = exports.loginValidationRules = exports.signupValidationRules = void 0;
const express_validator_1 = require("express-validator");
const Admin_1 = require("../models/Admin");
const Student_1 = require("../models/Student");
const bcrypt = require("bcryptjs");
// Registration Validation
const signupValidationRules = () => {
    return [
        (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required").trim(),
        (0, express_validator_1.body)("email")
            .notEmpty()
            .withMessage("Email is required")
            .bail()
            .isEmail()
            .withMessage("Email is invalid")
            .bail()
            .custom((value) => {
            return Admin_1.Admin.findOne({
                where: {
                    email: value,
                },
            }).then((user) => {
                if (user) {
                    return Promise.reject("Email already in use");
                }
            });
        }),
        (0, express_validator_1.body)("password")
            .notEmpty()
            .withMessage("Password is required")
            .bail()
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
        (0, express_validator_1.body)("confirmPassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Confirm Passwords do not match");
            }
            return true;
        }),
    ];
};
exports.signupValidationRules = signupValidationRules;
// Login Validation
const loginValidationRules = () => {
    return [
        (0, express_validator_1.body)("email")
            .notEmpty()
            .withMessage("Email is required")
            .bail()
            .isEmail()
            .withMessage("Email is invalid")
            .bail()
        /*.custom((value) => {
          return Admin.findOne({
            where: {
              email: value,
            },
          }).then((user) => {
            if (!user) {
              return Promise.reject("Email not registered");
            }
          });
        })*/ ,
        (0, express_validator_1.body)("password")
            .notEmpty()
            .withMessage("Password is required")
            .bail()
            .custom(async (value, { req }) => {
            const user = await Admin_1.Admin.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                throw new Error("No user found with this email ID.");
            }
            const validPassword = await bcrypt.compare(value, user.password);
            if (!validPassword) {
                throw new Error("Invalid email or password");
            }
            return true;
        }),
    ];
};
exports.loginValidationRules = loginValidationRules;
// Student Store Validation
const StudentStoreRules = () => {
    return [
        (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required").bail(),
        (0, express_validator_1.body)("email")
            .notEmpty()
            .withMessage("Email is required")
            .bail()
            .isEmail()
            .withMessage("Email is invalid")
            .bail()
            .custom((value) => {
            return Student_1.Student.findOne({
                where: {
                    email: value,
                },
            }).then((student) => {
                if (student) {
                    return Promise.reject("Email already registered");
                }
            });
        }),
        (0, express_validator_1.body)("phone").notEmpty().withMessage("Phone is required"),
        (0, express_validator_1.body)("stream").notEmpty().withMessage("Stream is required"),
        (0, express_validator_1.body)("gender").notEmpty().withMessage("Gender is required"),
        (0, express_validator_1.body)("address").notEmpty().withMessage("Address is required"),
    ];
};
exports.StudentStoreRules = StudentStoreRules;
// Student update Validation
const StudentUpdateRules = () => {
    return [
        (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required").bail(),
        (0, express_validator_1.body)("email")
            .notEmpty()
            .withMessage("Email is required")
            .bail()
            .isEmail()
            .withMessage("Email is invalid")
            .bail()
            .custom(async (value, { req }) => {
            const user = await Student_1.Student.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (user && user.id != req.body.id) {
                throw new Error('Email already used');
            }
        }),
        (0, express_validator_1.body)("phone").notEmpty().withMessage("Phone is required"),
        (0, express_validator_1.body)("stream").notEmpty().withMessage("Stream is required"),
        (0, express_validator_1.body)("gender").notEmpty().withMessage("Gender is required"),
        (0, express_validator_1.body)("address").notEmpty().withMessage("Address is required"),
    ];
};
exports.StudentUpdateRules = StudentUpdateRules;
