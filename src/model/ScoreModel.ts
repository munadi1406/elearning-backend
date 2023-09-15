import { myCache } from "../middleware/cacheManager"
import { checkQuizTimeLeft } from "./QuizModel"
import { QuizAnswer } from "./schema/Answer"
import { AnswerOption } from "./schema/AnswerOption"
import { Question } from "./schema/Question"
import { Score } from "./schema/Score"

export const setScore = async (data: any, transaction: any) => {
    try {
        const getCountQustion = await Question.count({ where: { id_quiz: data.id_quiz } })
        const score = 100 / Number(getCountQustion)
        const getNilai = await QuizAnswer.count({
            include: {
                attributes: [],
                model: AnswerOption,
                as: "answerOption",
                where: {
                    answer_is_true: true,
                }
            },
            where: {
                id_quiz: data.id_quiz,
                id_users: data.id_users
            },
            transaction
        })
        const currentScore = Number(getNilai) * score
        const findScore = await Score.findOne({
            attributes: ['id_score'],
            where: {
                id_quiz: data.id_quiz,
                id_users: data.id_users,
            }
        })
        if (findScore) {
            await Score.update({
                score: currentScore,
            }, {
                where: {
                    id_quiz: data.id_quiz,
                    id_users: data.id_users,
                },
            })
        } else {
            await Score.create({
                id_quiz: data.id_quiz,
                id_users: data.id_users,
                score: currentScore
            })
        }
    } catch (error) {
        throw error
    }
}


export const getScoreQuiz = async (id_quiz: number, id_users: number) => {
    try {
        const data: any = await Score.findOne({
            attributes: ['score'],
            where: {
                id_quiz,
                id_users
            }
        })
        if (!data) return { message: "Anda Belum Selesai Mengerjakan Quiz" }
        const getQuizCount = await Question.count({
            where: {
                id_quiz
            }
        })
        const checkAnswerIsFinish = await QuizAnswer.count(
            {
                where: {
                    id_quiz,
                    id_users,
                }
            })
        const payload = {
            terjawab: checkAnswerIsFinish,
            soal: getQuizCount,
            score: data.score
        }
        if (getQuizCount !== checkAnswerIsFinish) {
            const checkTimeLeft = await checkQuizTimeLeft(id_quiz, id_users)
            const dataCache = myCache.get(`score-${id_quiz}-${id_users}`)
            if (dataCache) {
                return dataCache
            }
            if (!checkTimeLeft) {
                myCache.set(`score-${id_quiz}-${id_users}`, payload)
                return { terjawab: checkAnswerIsFinish, soal: getQuizCount, score: data.score }
            }
            return { message: "Anda Belum Selesai Mengerjakan Quiz" }
        } else {
            myCache.set(`score-${id_quiz}-${id_users}`, payload)
            return { terjawab: checkAnswerIsFinish, soal: getQuizCount, score: data.score }
        }
    } catch (error) {
        throw error;
    }
}