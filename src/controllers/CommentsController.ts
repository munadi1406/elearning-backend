import { Response } from "express"
import { requestWithIdUsers } from "./postController"
import { errorResponse } from "./usersController"
import { body, validationResult } from "express-validator"
import { createComments, deleteComments, updateComments } from "../model/CommentsModel"

export const handleCreateComments = async(req:requestWithIdUsers,res:Response)=>{
    const commentsRules = [
        body('id_post')
        .isNumeric().withMessage("id_post harus number"),
        body('comment')
        .isAscii().withMessage("Nama Harus Berupa String"),
    ]
    try {
        await Promise.all(commentsRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages[0] });
        }
        const idUsers = Number(req.user)
        const {id_post,comment} = req.body
        const data = await createComments({id_users:idUsers,id_post:Number(id_post),comment})
        if(data){
            return res.status(201).json({statusCode:201,message:"Comment Created"})
        }else{
            return res.status(404).json({statusCode:404,message:"Comment Failed Updated"})
        }

    } catch (error) {
        return errorResponse(res)
    }
}

export const handleUpdateComment = async(req:requestWithIdUsers,res:Response)=>{
    const commentsRules = [
        body('id_comment')
        .isNumeric().withMessage("id_comment harus number"),
        body('comment')
        .isAscii().withMessage("Nama Harus Berupa String"),
    ]
    try {
        await Promise.all(commentsRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages[0] });
        }
        const {id_comment,comment} = req.body
        const data = await updateComments(Number(id_comment),comment)
        if(data){
            return res.status(200).json({statusCode:200,message:"Comment Updated"})
        }else{
            return res.status(404).json({statusCode:404,message:"Comment Failed Updated"})
        }

    } catch (error) {
        return errorResponse(res)
    }
}

export const handleDeleteComment = async(req:requestWithIdUsers,res:Response)=>{
    const commentsRules = [
        body('id_comment')
        .isNumeric().withMessage("id_comment harus number"),
        body('comment')
        .isAscii().withMessage("Nama Harus Berupa String"),
    ]
    try {
        await Promise.all(commentsRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages[0] });
        }
        const {idComment} = req.params
        const data = await deleteComments(Number(idComment))
        if(data){
            return res.status(200).json({statusCode:200,message:"Comment deleted"})
        }else{
            return res.status(404).json({statusCode:404,message:"Comment Failed deleted"})
        }

    } catch (error) {
        return errorResponse(res)
    }
}