import { DataTypes } from 'sequelize';
import { sequelize } from './../../config/db';
import { Quiz } from './Quiz';
import { Users } from './Users';

export const Score = sequelize.define('score', {
    id_score: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement:true,
    },
    id_quiz:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    id_users:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    score:{
        type:DataTypes.FLOAT,
        allowNull:false,
    },
},{
    freezeTableName:true,
    timestamps:true,
    indexes:[{
        fields:['id_quiz','id_users'],
        name:"idx_quiz_users"
    }]
})
Score.belongsTo(Quiz,{foreignKey:'id_quiz',onDelete:"cascade",as:"quiz"})
Quiz.hasMany(Score,{foreignKey:'id_quiz',onDelete:"cascade",as:"score"})
Score.belongsTo(Users,{foreignKey:'id_users',onDelete:"cascade",as:"user"})
Users.hasMany(Score,{foreignKey:'id_users',onDelete:"cascade"})