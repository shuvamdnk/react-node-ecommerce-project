import { RequestHandler } from 'express';
import { User } from '../models/Users';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = String(process.env.JWT_API_SECRET || 'secret');
const issuer = 'ts-node';
const algorithm = 'HS256';

export const UserRegistration: RequestHandler = async (req, res, next) => {
    const { name, email, phone, password } = req.body;
    console.log(name, email, phone, password);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    try {
        let user: User | null = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: await bcrypt.hash(password, 10)
        });
        res.status(201).json({
            code: 201,
            status: "success",
            message: "Registration Successful."
        })
    } catch (error) {
        console.log(error);

        res.status(409).json({
            code: 409,
            status: "error",
            message: "Registration failed."
        });
    }
}

export const UserLogin: RequestHandler = async (req, res, next) => {
    let { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    try {
        let user: User | null = await User.findOne({
            where: {
                email: email
            }
        });
        if (user) {
            const payload = {
                id: user.id,
            };

            const options: jwt.SignOptions = {
                issuer,
                algorithm,
                expiresIn: '10d',
            };

            const token = jwt.sign(payload, JWT_SECRET, options)
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

    } catch (error) {
        res.status(401).json({
            code: 401,
            status: "Unauthorized",
            message: "Login failed."
        });
    }
}

export const UserVerify: RequestHandler = async (req, res, next) => {
    res.status(200).json({
        code: 200,
        status: "success",
    })
}

export const StudentCreate: RequestHandler = async (req, res, next) => {
    res.render('admin/add-student', {
        page: 'Add Student',
        layout: 'layouts/main',
        currentUrl: req.originalUrl,
    })
}

export const StudentStore: RequestHandler = async (req, res, next) => {
    const { name, email, phone } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }

    try {
        let student: User | null = await User.create({
            name: name,
            email: email,
            phone: phone,
        });

        res.json({
            "status": 200,
            "success": "User Added Successful."
        })

    } catch (error) {
        res.json({
            "status": 401,
            "errors": error
        });
    }

}

export const StudentEdit: RequestHandler = async (req, res, next) => {
    try {
        var { id } = req.query;

        if (typeof id == 'undefined') {
            return res.redirect('/student');
        }

        const student = await User.findOne(
            {
                where: {
                    id: id
                }
            }
        );
        if (student) {
            return res.render('admin/edit-student', {
                page: 'Edit Student',
                layout: 'layouts/main',
                currentUrl: req.originalUrl,
                student: student
            })
        } else {
            return res.redirect('/student');
        }

    } catch (error) {
        console.log(error);

        res.json({
            "status": 401,
            "errors": error
        });
    }
}


export const StudentUpdate: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    try {
        const { name, email, phone, stream, gender, address, id } = req.body;
        const student = await User.update({
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
        })

        res.json({
            "status": 200,
            "success": "Student Updated Successful."
        })


    } catch (error) {
        res.json({
            "status": 401,
            "errors": error
        });
    }
}


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
