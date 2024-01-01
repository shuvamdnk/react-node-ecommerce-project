import { RequestHandler } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

const JWT_SECRET = String(process.env.JWT_API_SECRET);

export const auth: RequestHandler = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies.access_token || req.query.token;

    if (!token) {
        return res.status(401).json({
            code: 401,
            status: 'Unauthorized',
            message: 'Authentication token not found.'
        });
    }

    const options: jwt.VerifyOptions & { complete: true } = {
        algorithms: ["HS256"],
        issuer: "ts-node",
        complete: true,
    };

    if (token) {
        jwt.verify(
            token,
            JWT_SECRET,
            options,
            (err: VerifyErrors | null, authUser: jwt.JwtPayload | undefined) => {
                if (err) {
                    return res.status(401).json({
                        code: 401,
                        status: 'Unauthorized',
                        message: 'Invalid authentication token.'
                    });
                }
                next();
            }
        );
    }
};