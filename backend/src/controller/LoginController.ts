import {Request,Response,NextFunction,RequestHandler} from 'express';
import { Admin } from '../models/Admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const JWT_SECRET = String(process.env.JWT_SECRET || 'secret');
const issuer = 'ts-node';
const algorithm = 'HS256';

export const LoginPage:RequestHandler = (req,res,next) => {
    res.render('login',{
        page:'Login',
        layout:'layouts/app',
        currentUrl: req.originalUrl,
    });
}

export const RegisterPage:RequestHandler = (req,res,next) => {
    res.render('register',{
        page:'Register',
        layout:'layouts/app',
        currentUrl: req.originalUrl,
    });
}

export const LoginAction:RequestHandler =async (req,res,next) => {
    let {email,password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    try {
        let user:Admin | null = await Admin.findOne({
            where:{
                email:email
            }
        });
        if(user){
            const payload = { 
                id:user.id,
                name:user.name,
                email:user.email 
            };

            const options:jwt.SignOptions = { 
                issuer, 
                algorithm,
                expiresIn:'10d', 
            };
            const token = jwt.sign(payload,JWT_SECRET,options)
    
            return res.cookie("access_token", token, {
                httpOnly: true,
            }).status(200).json({
                'status':200,
                'success':'Login Successful'
            });
        }
        
    } catch (error) {
        return res.json({'status':401,'error':'Error'});
    }
}

export const RegisterAction:RequestHandler = async (req,res,next) => {
    let {name,email,password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    try {
        let user:Admin | null = await Admin.create({
            name:name,
            email:email,
            password:await bcrypt.hash(password,10)
        });
        res.json({
            "status":200,
            "success":"Registration Successful."
        })
    } catch (error) {
        res.json({
            "status":401,
            "errors":error
        });
    }
}

export const Logout:RequestHandler = async (req,res,next) => {
    res.clearCookie("access_token").status(200);
    res.redirect('/login');
}