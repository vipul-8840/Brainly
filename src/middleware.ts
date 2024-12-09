import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from './config';
import  jwt  from 'jsonwebtoken';

export const  userMiddleware = (req:Request,res:Response,next:NextFunction)=>
{
     const header= req.headers.token;
     const decoded= jwt.verify(header as string,JWT_SECRET);

     if(decoded)
     {
        //@ts-ignore
        req.userId = decoded.id;
        next();
     }
     else{
        res.status(411).json({
            mssg:"You are not logged in"
        })
        return 
     }


}
