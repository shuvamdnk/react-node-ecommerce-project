import { RequestHandler } from 'express';
import { Student } from "../models/Student";
import { User } from '../models/Users';
import { validationResult } from 'express-validator';
export const StudentIndex: RequestHandler = async (req, res, next) => {
    const data = await User.findAll();
    res.render('admin/student', {
        page: 'Students',
        layout: 'layouts/main',
        currentUrl: req.originalUrl,
        students: data
    })
    // res.json({
    //     status:"success",
    //     // users:data
    // }) 
}

export const StudentCreate: RequestHandler = async (req, res, next) => {
    res.render('admin/add-student', {
        page: 'Add Student',
        layout: 'layouts/main',
        currentUrl: req.originalUrl,
    })
}

export const StudentStore: RequestHandler = async (req, res, next) => {
    const { name, email, phone, stream, gender, address } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }

    try {
        let student: Student | null = await Student.create({
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

        const student = await Student.findOne(
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
        const student = await Student.update({
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


export const StudentDelete: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const student = await Student.destroy({
            where: {
                id: id
            }
        })

        res.redirect('/student');
    } catch (error) {
        res.json({
            "status": 401,
            "errors": error
        });
    }
}
