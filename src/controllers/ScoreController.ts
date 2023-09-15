import { Response } from "express";
import { requestWithIdUsers } from "./postController";
import { errorResponse } from "./usersController";
import { getScoreQuiz } from "../model/ScoreModel";

export const handleGetScoreQuiz = async(req:requestWithIdUsers,res:Response)=>{
    try {
        const idUsers = req.user
        const {idQuiz} = req.params
        const data = await getScoreQuiz(Number(idQuiz),Number(idUsers))
        return res.status(200).json({statusCode:200,data})
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}