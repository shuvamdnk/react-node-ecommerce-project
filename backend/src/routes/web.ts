import { Router, Request,Response,NextFunction } from 'express';
const route = Router();

// Controllers
import { LoginPage, RegisterPage, LoginAction, RegisterAction, Logout } from '../controller/LoginController';
import { dashboard } from '../controller/HomeController';
import { StudentIndex, StudentCreate, StudentStore, StudentDelete, StudentEdit, StudentUpdate } from '../controller/StudentController';
// Validation
import { signupValidationRules, loginValidationRules, StudentStoreRules, StudentUpdateRules } from '../validation/validation';

// Middleware 
import { auth, guest } from '../middleware/auth';
import multer from 'multer';
const upload = multer();

// routes   
route.get('/',(req:Request,res:Response,next:NextFunction) => {
    res.redirect('/login');
});

route.get('/login',guest,LoginPage);
route.get('/register',guest,RegisterPage);
route.post('/login',guest,loginValidationRules(),LoginAction);
route.post('/register',guest,signupValidationRules(),RegisterAction);
route.get('/logout',auth,Logout);

route.get('/dashboard',auth,dashboard);

route.get('/student',auth,StudentIndex);
route.get('/add-student',auth,StudentCreate);
route.post('/store-student',auth,StudentStoreRules(),StudentStore);
route.get('/student-delete/:id',auth,StudentDelete);
route.get('/student-edit',auth,StudentEdit);
route.post('/student-update',auth,StudentUpdateRules(),StudentUpdate);

export default route;