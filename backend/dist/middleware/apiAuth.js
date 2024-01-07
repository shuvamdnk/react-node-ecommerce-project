"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = String(process.env.JWT_API_SECRET);
const auth = async (req, res, next) => {
    var _a;
    const token = ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || req.cookies.access_token || req.query.token;
    if (!token) {
        return res.status(401).json({
            code: 401,
            status: 'Unauthorized',
            message: 'Authentication token not found.'
        });
    }
    const options = {
        algorithms: ["HS256"],
        issuer: "ts-node",
        complete: true,
    };
    if (token) {
        jsonwebtoken_1.default.verify(token, JWT_SECRET, options, (err, authUser) => {
            if (err) {
                return res.status(401).json({
                    code: 401,
                    status: 'Unauthorized',
                    message: 'Invalid authentication token.'
                });
            }
            next();
        });
    }
};
exports.auth = auth;
