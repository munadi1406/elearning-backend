import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { Post } from "./Post";

export const Quiz = sequelize.define('quiz', {
    id_quiz: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_post: {
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    deskripsi: DataTypes.TEXT,
    start_quiz:DataTypes.DATE(6),
    end_quiz:DataTypes.DATE(6),
},{
    freezeTableName:true,
    timestamps: false,
});
Quiz.belongsTo(Post,{foreignKey:'id_post',onDelete:"cascade"})
Post.hasMany(Quiz,{foreignKey:'id_post',as:'kuis'})
