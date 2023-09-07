import { sequelize } from "../config/db";
import { shuffleArray } from "../services/shuffleArray";
import { AnswerOption } from "./schema/AnswerOption";
import { Course } from "./schema/Course";
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


export const createQuis = async (dataQuiz: QuiZData[], judul: string, idCourse: number, id_users: number, deskripsi: string, startQuiz: string, endQuiz: string, duration: number) => {
  const transaction = await sequelize.transaction()
  try {
    const checkStatusUsers = await Course.findOne({
      attributes: ['id_course'],
      where: { id_users, id_course: idCourse }
    })
    if (!checkStatusUsers) return { status: false, message: "anda tidak memiliki Akses" };

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
      duration
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
      attributes: ['id_post', 'judul', 'typePost'],
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
        }]
    })
    return data
  } catch (error) {
    throw error
  }
}

export const quizTaking = async (id_quiz: number) => {
  try {
    const dataQuiz: any = await Post.findAll({
      attributes: ['id_post', 'judul'],
      include: {
        attributes: ['id_quiz','deskripsi','duration','start_quiz','end_quiz'],
        model: Quiz,
        as: "kuis",
        include: [
          {
            attributes: ['id_question',],
            model: Question,
            as: "question",
          },
        ],
        where: {
          id_quiz,
        },
      }, 
    });
    if(!dataQuiz) return {status:false,message:"Quiz Tidak Di Temukan"};
    const endQuiz = dataQuiz[0].kuis[0].end_quiz
    const nowDate = new Date()
    if(nowDate > endQuiz){
      return {status:false,message:"kuis sudah berakhir , jika anda ingin mengerjakan kuis ini hubungi Instruktur Course Anda Untuk Memperpanjang Waktu Kuis"}
    }
    // Mengambil pertanyaan dari hasil query
    // Salin objek JSON
    const dataQuizCopy = JSON.parse(JSON.stringify(dataQuiz));
    shuffleArray(dataQuizCopy[0]?.kuis[0]?.question || []);
    return {status:true,data:dataQuizCopy};
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getQuizTake = async (id_question: number) => {
  try {
    const dataQuestion = await Question.findOne({
      include:{
        attributes:['id_answer_option','answer_option'],
        model:AnswerOption,
        as:'answerOption',
      },
      where: { id_question }
    })
    const dataQuestionCopy = JSON.parse(JSON.stringify(dataQuestion));
    shuffleArray(dataQuestionCopy?.answerOption || []);
    return dataQuestionCopy
  } catch (error) {

  }
}