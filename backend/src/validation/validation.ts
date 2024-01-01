import { body } from "express-validator";
import { Admin } from "../models/Admin";
import { Student } from "../models/Student";
const bcrypt = require("bcryptjs");
// Registration Validation
export const signupValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required").trim(),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Email is invalid")
      .bail()
      .custom((value) => {
        return Admin.findOne({
          where: {
            email: value,
          },
        }).then((user) => {
          if (user) {
            return Promise.reject("Email already in use");
          }
        });
      }),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Passwords do not match");
      }
      return true;
    }),
  ];
};

// Login Validation
export const loginValidationRules = () => {
  return [
    body("email")
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
      })*/,
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .custom(async (value, { req }) => {
        const user = await Admin.findOne({
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

// Student Store Validation
export const StudentStoreRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required").bail(),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Email is invalid")
      .bail()
      .custom((value) => {
        return Student.findOne({
          where: {
            email: value,
          },
        }).then((student) => {
          if (student) {
            return Promise.reject("Email already registered");
          }
        });
      }),
    body("phone").notEmpty().withMessage("Phone is required"),  
    body("stream").notEmpty().withMessage("Stream is required"),
    body("gender").notEmpty().withMessage("Gender is required"),
    body("address").notEmpty().withMessage("Address is required"),
  ];
};


// Student update Validation
export const StudentUpdateRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required").bail(),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Email is invalid")
      .bail()
      .custom(async(value,{req}) => {
        const user = await Student.findOne({
          where: {
            email: req.body.email,
          },
        });
        if(user && user.id != req.body.id){
          throw new Error('Email already used');
        }
      }),
    body("phone").notEmpty().withMessage("Phone is required"),  
    body("stream").notEmpty().withMessage("Stream is required"),
    body("gender").notEmpty().withMessage("Gender is required"),
    body("address").notEmpty().withMessage("Address is required"),
  ];
};