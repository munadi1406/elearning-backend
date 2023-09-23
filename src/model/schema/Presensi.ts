import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db"
import { Post } from "./Post"

export const Presensi = sequelize.define('presensi',{
    id_presensi:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    id_post:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    start_date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    end_date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    presensi_type:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    indexes:[{
        fields:['id_post'],
        name:"idx_presensi"
    }],
    timestamps:true,
    freezeTableName:true,
})
Presensi.belongsTo(Post,{foreignKey:"id_post",onDelete:"cascade",as:"post"})
Post.hasMany(Presensi,{foreignKey:"id_post",onDelete:'cascade',as:"presensi"})