import { Response } from "express"
import { requestWithIdUsers } from "./postController"
import { errorResponse } from "./usersController"
import { addAnswer } from "../model/AnswerModel"
import { setScore } from "../model/ScoreModel"

export const handleAddAnswer = async(req:requestWithIdUsers,res:Response)=>{
    try {
        const {id_quiz,id_question,id_answer_option} = req.body
        const idUsers = req.user
        const payload ={
            id_quiz:Number(id_quiz),
            id_question:Number(id_question),
            id_answer_option:Number(id_answer_option),
            id_users:Number(idUsers)
        }
        const add = await addAnswer(payload)
        if(add.status){
            return res.status(200).json({statusCode:200,message:add.message})
        }else{
            return res.status(404).json({statusCode:404})
        }
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}