import { QuizLog } from "./schema/QuizLog"

export const createQuizLog = async(id_users:number,id_quiz:number)=>{
    try {
        console.log("running");
        const check  = await QuizLog.findOne({
            where:{
                id_users,
                id_quiz
            }
        })
        if(check) return 
        await QuizLog.create({
            id_quiz,
            id_users,
        })
    } catch (error) {
        throw error
    }
}