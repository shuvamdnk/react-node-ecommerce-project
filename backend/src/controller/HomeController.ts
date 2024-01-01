import {Request,Response,NextFunction,RequestHandler} from 'express';
import { Admin } from '../models/Admin';

export const dashboard:RequestHandler = (req,res,next) => {
    res.render('admin/dashboard',{
        page:'Dashboard',
        layout:'layouts/main',
        currentUrl: req.originalUrl,
    })
}