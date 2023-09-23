import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { Users } from "./Users";
import { AnswerOption } from "./AnswerOption";
import { Quiz } from "./Quiz";
import { Question } from "./Question";

export const QuizAnswer = sequelize.define('answer', {
    id_answer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_quiz: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_users: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_question: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_answer_option: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
}, {
    freezeTableName: true,
    timestamps:true,
    indexes: [
        {
            unique:true,
            fields: ['id_users','id_question','id_answer_option'],
            name: 'idx_quiz_question_answer',
        },
        {
            fields: ['id_users'],
            name: 'idx_users',
        },
    ],
});

QuizAnswer.belongsTo(Quiz, { foreignKey: 'id_quiz',as:"post",onDelete:"cascade" });
Quiz.hasMany(QuizAnswer,{foreignKey:"id_quiz",as:'quiz'})
QuizAnswer.belongsTo(Users, { foreignKey: 'id_users' });
QuizAnswer.belongsTo(Question, { foreignKey: 'id_question',as:"question",onDelete:'cascade' });
Question.hasMany(QuizAnswer, { foreignKey: 'id_question',as:"answer" });
QuizAnswer.belongsTo(AnswerOption, { foreignKey: 'id_answer_option',as:'answerOption' });
