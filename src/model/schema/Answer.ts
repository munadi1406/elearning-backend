import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { Users } from "./Users";
import { AnswerOption } from "./AnswerOption";
import { Post } from "./Post";
import { Quiz } from "./Quiz";

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
    },
    waktu_jawab: {
        type: DataTypes.DATE(6),
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps:true,
});

QuizAnswer.belongsTo(Quiz, { foreignKey: 'id_quiz',as:"post",onDelete:"cascade" });
Quiz.hasMany(QuizAnswer,{foreignKey:"id_quiz",as:'quiz'})
QuizAnswer.belongsTo(Users, { foreignKey: 'id_users' });
QuizAnswer.belongsTo(QuizAnswer, { foreignKey: 'id_question' });
QuizAnswer.belongsTo(AnswerOption, { foreignKey: 'id_answer_option' });
