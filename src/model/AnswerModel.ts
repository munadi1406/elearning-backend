
import { sequelize } from "../config/db";
import { QuizAnswer } from "./schema/Answer"
import { Model } from 'sequelize'; // Import Model dari sequelize sesuai dengan versi Anda
import { setScore } from "./ScoreModel";

interface payloadAddAnswer {
    id_quiz: number,
    id_users: number,
    id_question: number,
    id_answer_option: number,
}

interface QuizAnswerModel extends Model {
    id_answer?: number;
}

type CheckAnswerType = QuizAnswerModel | null;

export const addAnswer = async (data: payloadAddAnswer) => {
    const transaction = await sequelize.transaction()
    try {
        const checkAnswer: CheckAnswerType = await QuizAnswer.findOne({
            attributes: ['id_answer'],
            where: {
                id_question: data.id_question,
                id_users: data.id_users
            }
        });
        if (checkAnswer) {
            await QuizAnswer.update({
                id_answer_option: data.id_answer_option
            }, {
                where: {
                    id_answer: checkAnswer.id_answer
                },
                transaction
            })
        } else {
            await QuizAnswer.create({ ...data }, { transaction })
        }
        await setScore(data,transaction)
        transaction.commit()
        return { status: true, message: "Jawaban Berhasil Di Post" }

    } catch (error) {
        transaction.rollback()
        throw error
    }
}       