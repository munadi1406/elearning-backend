import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { Post } from "./Post";

export const Pengumuman = sequelize.define('pengumuman', {
    id_pengumuman: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_post: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    konten: {
        type: DataTypes.TEXT,
    },
},{
    tableName: 'pengumuman',
    timestamps:false,
});

Pengumuman.belongsTo(Post, {
    foreignKey: 'id_post',
    onDelete: 'CASCADE',
    as: 'post', // Gantilah dengan nama asosiasi yang Anda inginkan
});
Post.hasMany(Pengumuman, {
    foreignKey: 'id_post',
    as: 'pengumuman',
});

