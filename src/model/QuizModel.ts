import { sequelize } from "../config/db";
import { AnswerOption } from "./schema/AnswerOption";
import { Post } from "./schema/Post";
import { Question } from "./schema/Question";
import { Quiz } from "./schema/Quiz";
import { Users } from "./schema/Users";


interface QuiZData {
  question: string;
  answerOption: {
    answerOption: string;
    answerIsTrue: boolean;
  }[];
};


export const createQuis = async (dataQuiz: QuiZData[], judul: string, idCourse: number, id_users: number, deskripsi: string, startQuiz: string, endQuiz: string) => {
  const transaction = await sequelize.transaction()
  try {
    const post: any = await Post.create({
      id_users,
      id_course: idCourse,
      judul,
      typePost: "Kuis"
    }, { transaction });
    const idPost = post.id_post;
    const quiz: any = await Quiz.create({
      id_post: idPost,
      deskripsi,
      start_quiz: startQuiz,
      end_quiz: endQuiz,
    }, { transaction })
    for (const e of dataQuiz) {
      const question: any = await Question.create({
        id_quiz: quiz.id_quiz,
        question: e.question,
      }, { transaction });
      for (const answer of e.answerOption) {
        await AnswerOption.create({
          id_question: question.id_question,
          answer_option: answer.answerOption,
          answer_is_true: answer.answerIsTrue,
        }, { transaction });
      }
    }
    await transaction.commit()
    return { status: true, message: "Quis Berhasil Di Buat" }
  } catch (error) {
    console.log(error)
    await transaction.rollback()
    throw error
  }
}

export const detailQuiz = async (id_post: number) => {
  try {
    const data = await Post.findOne({
      attributes:['id_post','judul','typePost'],
      where: {
        id_post
      },
      include: [
        {
          attributes: ['username'],
          model: Users,
          as: "users"
        },
        {
          model: Quiz,
          as: 'kuis',
          include: [{
            attributes: ['id_question', 'question'],
            model: Question,
            as: 'question',
            include: [{
              attributes: ['id_answer_option', 'answer_option'],
              model: AnswerOption,
              as: 'answerOption',
            }]
          }],
        }]
    })
    return data
  } catch (error) {
    throw error
  }
}