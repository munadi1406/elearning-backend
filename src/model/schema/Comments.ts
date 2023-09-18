import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../../config/db";
import { Post } from "./Post";
import { Users } from "./Users";

export const Comments = sequelize.define('comments',{
    id_comments:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_post:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    id_users:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    comment:{
        type:DataTypes.TEXT,
        allowNull:false,
    }
},{
    freezeTableName:true,
    timestamps:true,
    indexes:[{
        fields:['id_post','id_users'],
        name:"idx_comments_post_users"
    }]
})
Comments.belongsTo(Post,{foreignKey:"id_post",onDelete:"cascade"})
Post.hasMany(Comments,{foreignKey:"id_post",onDelete:"Cascade"})
Comments.belongsTo(Users,{foreignKey:"id_users",onDelete:"Cascade",as:'user'})
Users.hasMany(Comments,{foreignKey:"id_users",onDelete:"Cascade"})