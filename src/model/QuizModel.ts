import { sequelize } from "../config/db";
import { myCache } from "../middleware/cacheManager";
import { shuffleArray } from "../services/shuffleArray";
import { QuizAnswer } from "./schema/Answer";
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

export const quizTaking = async (id_quiz: number, id_users: number) => {
  try {
    const dataQuiz: any = await Post.findOne({
      attributes: ['id_post', 'judul'],
      include: {
        attributes: ['id_quiz', 'deskripsi', 'duration', 'start_quiz', 'end_quiz'],
        model: Quiz,
        as: "kuis",
        required: true,
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
    if (!dataQuiz) {
      return { status: false, message: "Quiz Tidak Di Temukan" }
    }
    const validate = await quizCheckAvailabel(id_quiz, id_users);
    if (!validate.status) return { status: false, message: validate.message }
    const endQuiz = dataQuiz.kuis[0].end_quiz
    const nowDate = new Date()
    if (nowDate > new Date(endQuiz)) {
      return { status: false, message: dataQuiz }
    }
    // Mengambil pertanyaan dari hasil query
    // Salin objek JSON
    const dataQuizCopy = JSON.parse(JSON.stringify(dataQuiz));
    shuffleArray(dataQuizCopy?.kuis[0]?.question || []);
    return { status: true, data: dataQuizCopy };
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const getQuizTake = async (id_question: number) => {
  try {
    const dataCache = myCache.get(`question-${id_question}`)
    if (dataCache) {
      return dataCache
    }
    const dataQuestion = await Question.findOne({
      include: [{
        attributes: ['id_answer_option', 'answer_option'],
        model: AnswerOption,
        as: 'answerOption',
      }, {
        attributes: ['id_answer_option'],
        model: QuizAnswer,
        as: 'answer'
      }],
      where: { id_question }
    })
    const dataQuestionCopy = JSON.parse(JSON.stringify(dataQuestion))
    myCache.set(`question-${id_question}`, dataQuestionCopy);
    return dataQuestion
  } catch (error) {
    throw error
  }
}


export const quizEvaluate = async (id_quiz: number, id_users: number) => {
  try {
    const dataCache = myCache.get(`quizEvaluate-${id_quiz}-${id_users}`)
    if (dataCache) {
      return dataCache
    }
    const data: any = await QuizAnswer.findAll({
      attributes: ['createdAt'],
      include: [{
        // jawaban dari users
        attributes: ['answer_option', 'answer_is_true'],
        model: AnswerOption,
        as: 'answerOption',
      }, {
        model: Question,
        as: "question",
        include: [{
          // untuk mendpatkan jawaban yang benar
          attributes: ['answer_option', 'answer_is_true'],
          model: AnswerOption,
          as: "answerOption",
          where: {
            answer_is_true: true
          }
        }]
      }],
      where: {
        id_quiz,
        id_users,
      }
    })
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
    if (getQuizCount !== checkAnswerIsFinish) {
      const dateLeftCheck = await checkQuizTimeLeft(id_quiz,id_users)
      const dataEvaluateCopy = JSON.parse(JSON.stringify(data));
      myCache.set(`quizEvaluate-${id_quiz}-${id_users}`, dataEvaluateCopy)
      if (!dateLeftCheck) {
        return data
      }
      return {}
    } else {
      const dataEvaluateCopy = JSON.parse(JSON.stringify(data));
      myCache.set(`quizEvaluate-${id_quiz}-${id_users}`, dataEvaluateCopy)
      return data
    }
  } catch (error) {
    throw error
  }
}



const quizCheckAvailabel = async (id_quiz: number, id_users: number) => {
  try {
    const checkDate: any = await Quiz.findOne(
      {
        attributes: ['end_quiz', 'duration'],
        where: {
          id_quiz
        }
      })
    const date = new Date(checkDate.end_quiz)
    const nowDate = new Date()
    if (nowDate > date) {
      return { status: false, message: "Kuis Sudah Berakhir" }
    }
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
    if (getQuizCount === checkAnswerIsFinish) {
      return { status: false, message: "Kuis Sudah Anda Kerjakan" }
    }

    const checkTimeLeftUsers = await checkQuizTimeLeft(id_quiz,id_users);
    if(!checkTimeLeftUsers){
      return { status: false, message: "Kuis Sudah Berakhir" }
    }
    return { status: true }
  } catch (error) {
    throw error
  }
}

export const checkQuizTimeLeft = async (id_quiz: number, id_users: number) => {
  try {
    const checkDate: any = await Quiz.findOne(
      {
        attributes: ['end_quiz', 'duration'],
        where: {
          id_quiz
        }
      })
    const timeLeftCheck: any = await QuizAnswer.findOne({
      attributes: ['createdAt'],
      where: {
        id_quiz,
        id_users,
      },
      order: [['id_answer', 'desc']]
    })
    if (timeLeftCheck) {
      const endTime = new Date(timeLeftCheck.createdAt);
      const durations = Number(checkDate.duration)
      endTime.setMinutes(endTime.getMinutes() + durations);
      const dateNow = new Date()
      if (dateNow > endTime) {
        return false
      }
    }
    return true
  } catch (error) {
    throw error
  }
}


