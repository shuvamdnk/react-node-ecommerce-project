import { Router, Request, Response, NextFunction } from 'express';
const apiRoute = Router();

// Controllers
import { UserLogin, UserRegistration, UserVerify } from '../controller/UserController';

// Validation
import { signupValidationRules, loginValidationRules, StudentStoreRules, StudentUpdateRules } from '../validation/apiValidation';

// Middleware 
import { auth } from '../middleware/apiAuth';
import multer from 'multer';
const form_data = multer();

// api routes
/****************  Non auth routes ******************/
// User login / register
apiRoute.post('/auth/login', form_data.any(), loginValidationRules(), UserLogin);
apiRoute.post('/auth/register', form_data.any(), signupValidationRules(), UserRegistration);

/**************** auth routes ******************/
apiRoute.get('/auth/verify', form_data.any(), auth, UserVerify);

export default apiRoute;