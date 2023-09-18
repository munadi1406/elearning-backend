import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { Quiz } from "./Quiz";
import { Users } from "./Users";


export const QuizLog = sequelize.define('quiz_log', {
    id_quiz_log: {
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
}, {
    freezeTableName: true,
    timestamps:true,
    indexes: [
        {
            unique:true,
            fields: ['id_quiz','id_users'],
            name: 'idx_quiz_log_users',
        },
    ],
});
QuizLog.belongsTo(Quiz,{foreignKey:"id_quiz",onDelete:"cascade"})
Quiz.hasMany(QuizLog,{foreignKey:"id_quiz",onDelete:"Cascade"})
QuizLog.belongsTo(Users,{foreignKey:"id_users",onDelete:"Cascade"})
Users.hasMany(QuizLog,{foreignKey:"id_users",onDelete:"Cascade"})
