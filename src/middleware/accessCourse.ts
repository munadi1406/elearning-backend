import { NextFunction, Request, Response } from "express";
import { checkMemberInCourse } from "../model/courseModel";

interface requestWithIdUsers extends Request{
    user ?: number;
}

export const accessCourse = async (req:requestWithIdUsers,res:Response,next:NextFunction)=>{
    const idUsers = Number(req.user)
    const idCourse = Number(req.params.idCourse) 
    const checkIsMember = await checkMemberInCourse(idUsers,idCourse)
    if(!checkIsMember){
        return res.status(401).json({statusCode:401,message:"Forbidden"})
    }
    next()
}