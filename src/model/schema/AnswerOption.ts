import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { Question } from "./Question";

export const AnswerOption = sequelize.define('answer_option', {
    id_answer_option: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_question: DataTypes.INTEGER,
    answer_option: DataTypes.TEXT,
    answer_is_true: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
},{
  freezeTableName:true,
  timestamps:false,
});

AnswerOption.belongsTo(Question,{foreignKey:'id_question',onDelete:"cascade",as:"question"})
Question.hasMany(AnswerOption,{foreignKey:'id_question',as:'answerOption'})