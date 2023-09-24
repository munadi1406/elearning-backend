import { Response } from "express";
import { requestWithIdUsers } from "./postController";
import { errorResponse } from "./usersController";
import { createQuis, getQuizTake, quizEvaluate, quizTaking } from "../model/QuizModel";
import { body, validationResult } from "express-validator";

export const handleCreateQuis = async (req: requestWithIdUsers, res: Response) => {
    const validateDataQuiz = [
        body('idCourse').isNumeric().withMessage("Id Course Tidak Boleh Kosong"),
        body('judul').isAscii().withMessage("Judul Tidak Boleh Kosong"),
        body('deskripsi').isString().withMessage('deskripsi tidak boleh kosong'),
        body('startQuiz').isString().withMessage("Start Quiz Tidak Boleh Kosong"),
        body('endQuiz').isString().withMessage("End Quiz Tidak Boleh Kosong"),
        body('duration').isInt().withMessage("Durasi Pengerjaan Tidak Boleh Kosong"),
        body('dataQuiz').isArray().notEmpty(),
        body('dataQuiz.*.question').notEmpty(),
        body('dataQuiz.*.answerOption').isArray().notEmpty(),
        body('dataQuiz.*.answerOption.*.answerOption').notEmpty(),
        body('dataQuiz.*.answerOption.*.answerIsTrue').isBoolean().notEmpty(),
    ];

    try {
        await Promise.all(validateDataQuiz.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages[0] });
        }

        const { dataQuiz, judul, idCourse, deskripsi, startQuiz, endQuiz,duration } = req.body;
        // validasi untuk mengecek apakah ada di setiap opsi jawaban harus ada yang true
        // every akan melooping setiap array di dalam dataquiz dengan properti asnwerOption jika ada salah satu true maka every akan false,
        // some akan melooping answerOption dan mencari jika ada salah satu true maka true dan every akan jadi false,
        // every satu kondisi terpenuhi maka false
        // sedangkan some jika ada salah satu kondisi terpenuhi maka benar (some menjadi kondisi bagi every)
        const hasAtLeastOneTrueAnswer = dataQuiz.every((question: any) =>
            question.answerOption.some((option: any) => option.answerIsTrue)
        );
        if (!hasAtLeastOneTrueAnswer) {
            return res.status(400).json({
                statusCode: 400,
                message: "Setidaknya satu opsi jawaban yang benar harus diatur untuk setiap pertanyaan.",
            });
        }

        const idUsers: number = Number(req.user) 
        const insert = await createQuis(dataQuiz, judul, idCourse, idUsers, deskripsi, startQuiz, endQuiz,Number(duration))
        if (insert.status) {
            return res.status(200).json({ statusCode: 200, message: insert.message })
        } else {
            return res.status(404).json({ statusCode: 400, message: insert.message })
        }
    } catch (error) {
        return errorResponse(res)
    }
}

export const handleQuizTaking = async (req:requestWithIdUsers,res:Response)=>{
    try {
        const {idQuiz,idCourse} = req.params
        const idUsers = Number(req.user);
        const data = await quizTaking(Number(idQuiz),idUsers,Number(idCourse))
        if(data.status){
            return res.status(200).json({statusCode:200,data:data.data})
        }else{
            return res.status(404).json({statusCode:404,message:data.message})
        }
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}

export const handleGetQuiz = async (req:requestWithIdUsers,res:Response)=>{
    try {
        const {idQuestion} = req.params
        const idUsers = Number(req.user)
        const data = await getQuizTake(Number(idQuestion),idUsers)
        return res.status(200).json({statusCode:200,data})
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}

export const handleQuizEvaluate = async (req:requestWithIdUsers,res:Response)=>{
    try {
        const {idQuiz} = req.params
        const idUsers = Number(req.user)
        const data = await quizEvaluate(Number(idQuiz),idUsers) 
        return res.status(200).json({statusCode:200,data})
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}

