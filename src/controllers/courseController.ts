import { Request, Response } from "express";
import { createCourse, deleteCourse, detailCourse, getCourseByIdUsers, getCourseWhenUserAsMember, joinCourse, listMemberInCourse } from "../model/courseModel";
import { body, param, validationResult } from "express-validator";

interface requestWithIdUsers extends Request {
    user?: number;
}

export const createCourses = async (req: requestWithIdUsers, res: Response) => {
    const authValidationRules = [
        body('course')
            .notEmpty().withMessage("Masukkan Nama Course")
            .isAscii()
            .isLength({ min: 6, max: 255 }).withMessage("Nama Course Minimal 6 Karakter")
            .isString().withMessage("Nama Harus Berupa String"),
        body('desc_course')
            .notEmpty().withMessage('Masukkan Deskripsi Course')
            .isAscii(),
        body('academy')
            .notEmpty().withMessage('Masukkan Nama Sekolah atau Academy')
            .isAscii(),
        body('course_code')
            .notEmpty().withMessage('Masukkan Kode Course ')
            .isAscii(),

    ]
    try {
        await Promise.all(authValidationRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages });
        }

        const id_users = req.user;
        const { course, academy, desc_course, course_code } = req.body
        const payload = {
            id_users: Number(id_users),
            course,
            desc_course,
            academy,
            course_code
        }
        const insert = await createCourse(payload)
        if (insert.status) {
            return res.status(201).json({ statusCode: 201, message: insert.msg });
        } else {
            return res.status(400).json({ statusCode: 400, message: insert.msg });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
    }
}

export const listCourseWhenUsersAsInstructor = async (req: requestWithIdUsers, res: Response) => {
    const authValidationRules = [
        param('idCourse')
            .isInt().withMessage("Id Course Harus Berupa Angka"),
    ]
    try {
        await Promise.all(authValidationRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages });
        }
        const id_users = Number(req.user)
        const id_course = Number(req.params.idCourse)
        const data = await getCourseByIdUsers(id_users, id_course)
        return res.status(200).json({ data });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" })
    }
}

export const listCourseWhenUsersAsMember = async (req: requestWithIdUsers, res: Response) => {
    const authValidationRules = [
        param('idCourse')
            .isInt().withMessage("Id Course Harus Berupa Angka"),
    ]
    try {
        await Promise.all(authValidationRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages });
        }
        const id_users = Number(req.user)
        const id_course = Number(req.params.idCourse)
        const data = await getCourseWhenUserAsMember(id_users, id_course)
        return res.status(200).json({ data });
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}

export const getDetailCourse = async (req: requestWithIdUsers, res: Response) => {
    const authValidationRules = [
        param('idCourse')
            .isInt().withMessage("Id Course Harus Berupa Angka"),
    ]
    try {
        await Promise.all(authValidationRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages });
        }
        const idCourse: number = Number(req.params.idCourse);
        const idUsers: number = Number(req.user)
        const data = await detailCourse(idUsers, idCourse)
        return res.status(200).json({ statusCode: 200, data })
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}

export const reqJoinCourse = async (req: requestWithIdUsers, res: Response) => {
    const authValidationRules = [
        body('courseCode')
            .notEmpty().withMessage('Masukkan Kode Course ')
            .isString().withMessage("Course Code Tidak Valid"),
    ]
    try {
        await Promise.all(authValidationRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages });
        }

        const id_users = Number(req.user)
        const course_code = req.body.courseCode
        const join = await joinCourse(id_users, course_code);
        if (join.status) {
            return res.status(200).json({ statusCode: 200, message: join.message })
        } else {
            return res.status(404).json({ statusCode: 200, message: join.message })
        }
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}

export const reqDeleteCourse = async (req: requestWithIdUsers, res: Response) => {
    const authValidationRules = [
        param('idCourse')
            .notEmpty().withMessage('Masukkan Kode Course ')
            .isInt().withMessage("Course Code Tidak Valid"),
    ]
    try {
        await Promise.all(authValidationRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages });
        }
        const idCourse = Number(req.params.idCourse)
        const idUsers = Number(req.user);
        const deleteCourses = await deleteCourse(idCourse,idUsers)
        if(deleteCourses.status){
            return res.status(200).json({statusCode:200,message:deleteCourses.message})
        }else{
            return res.status(403).json({statusCode:403,message:deleteCourses.message})
        }
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}


export const handleListMemberInCouse = async (req: requestWithIdUsers, res: Response) => {
    const authValidationRules = [
        param('idCourse')
            .isInt().withMessage("Id Course Harus Berupa Angka"),
    ]
    try {
        await Promise.all(authValidationRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages });
        }
        const idCourse: number = Number(req.params.idCourse);
        const idMember:number = Number(req.params.idMember);
        const data:any = await listMemberInCourse(idCourse,idMember)
        if(data.status){
            return res.status(200).json({ statusCode: 200, data:data?.data })
        }else{
            return res.status(404).json({statusCode:404,data:data.data})
        }
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}

const errorResponse = (res: Response) => {
    return res.status(500).json({ statusCode: 500, message: "Internal Server Error" })
}