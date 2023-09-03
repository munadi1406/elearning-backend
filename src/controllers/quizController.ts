import { Response } from "express";
import { requestWithIdUsers } from "./postController";
import { errorResponse } from "./usersController";
import { createQuis } from "../model/QuizModel";

export const handleCreateQuis = async (req: requestWithIdUsers, res: Response) => {
    try {
        const { dataQuiz, judul, idCourse,deskripsi,startQuiz,endQuiz } = req.body;
        const idUsers:number = req.user ? Number(req.user) : 1
        const insert = await createQuis(dataQuiz, judul, idCourse,idUsers,deskripsi,startQuiz,endQuiz)
        if (insert.status) {
            return res.status(200).json({ statusCode: 200, message: insert.message })
        } else {
            return res.status(200).json({ statusCode: 400, message: insert.message })
        }
    } catch (error) {
        return errorResponse(res)
    }
}