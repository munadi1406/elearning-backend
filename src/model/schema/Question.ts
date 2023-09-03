import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { Quiz } from "./Quiz";

export const Question = sequelize.define('question', {
    id_question: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_quiz: {
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    question: DataTypes.TEXT,
},{
    freezeTableName:true,
    timestamps: false,
});
Question.belongsTo(Quiz,{foreignKey:'id_quiz',onDelete:"cascade"})
Quiz.hasMany(Question,{foreignKey:'id_quiz',as:'question'})
