import { RequestHandler } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { Admin } from "../models/Admin";

const JWT_SECRET = String(process.env.JWT_SECRET);

export const auth: RequestHandler = async (req, res, next) => {
  const token = req.cookies.access_token;
  
  if (!token) {
    res.redirect("/login");
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
            return res.redirect("/login");
        }
        next();
      }
    );
  }
};


export const authUser:RequestHandler = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        res.locals.user = null;
        next();
    }

    const options: jwt.VerifyOptions & { complete: true } = {
        algorithms: ["HS256"],
        issuer: "ts-node",
        complete: true,
    };

    if(token){
        jwt.verify(token,JWT_SECRET, options ,async (err:VerifyErrors | null,authUser:jwt.JwtPayload | undefined) => {
            if(err){
                res.locals.user = null;
                next();
            }else{
                if(typeof authUser != 'undefined'){
                    
                    let user = await Admin.findOne({
                        where:{
                            id:authUser.payload.id
                        }
                    })
                    
                    res.locals.user = user;
                    next();
                }
            }
        })
    }
}

export const guest:RequestHandler = (req,res,next) => {
    if(res.locals.user){
       res.redirect('/dashboard');
    }else{
       next();
    }
}
