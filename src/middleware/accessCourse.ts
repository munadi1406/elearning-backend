import { NextFunction, Request, Response } from "express";
import { checkMemberInCourse } from "../model/courseModel";

interface requestWithIdUsers extends Request {
    user?: number;
}

export const accessCourse = async (req: requestWithIdUsers, res: Response, next: NextFunction) => {
    const idUsers = Number(req.user);
    const idCourse = req.params.idCourse ? Number(req.params.idCourse) : (req.body.idCourse ? Number(req.body.idCourse) : null);
    if (!idCourse) {
        return res.status(403).json({ statusCode: 403, message: 'Forbidden' });
    }

    const checkIsMember = await checkMemberInCourse(idUsers, idCourse);

    if (!checkIsMember) {
        return res.status(403).json({ statusCode: 403, message: 'Forbidden' });
    }

    next();
};