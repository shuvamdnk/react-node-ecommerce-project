"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guest = exports.authUser = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = require("../models/Admin");
const JWT_SECRET = String(process.env.JWT_SECRET);
const auth = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.redirect("/login");
    }
    const options = {
        algorithms: ["HS256"],
        issuer: "ts-node",
        complete: true,
    };
    if (token) {
        jsonwebtoken_1.default.verify(token, JWT_SECRET, options, (err, authUser) => {
            if (err) {
                return res.redirect("/login");
            }
            next();
        });
    }
};
exports.auth = auth;
const authUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.locals.user = null;
        next();
    }
    const options = {
        algorithms: ["HS256"],
        issuer: "ts-node",
        complete: true,
    };
    if (token) {
        jsonwebtoken_1.default.verify(token, JWT_SECRET, options, async (err, authUser) => {
            if (err) {
                res.locals.user = null;
                next();
            }
            else {
                if (typeof authUser != 'undefined') {
                    let user = await Admin_1.Admin.findOne({
                        where: {
                            id: authUser.payload.id
                        }
                    });
                    res.locals.user = user;
                    next();
                }
            }
        });
    }
};
exports.authUser = authUser;
const guest = (req, res, next) => {
    if (res.locals.user) {
        res.redirect('/dashboard');
    }
    else {
        next();
    }
};
exports.guest = guest;
