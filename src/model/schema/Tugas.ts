import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { Post } from "./Post";

export const Tugas = sequelize.define('tugas', {
    id_tugas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_post: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    deskripsi: {
        type: DataTypes.TEXT,
    },
    fromDate: {
        type: DataTypes.DATE,
    },
    toDate: {
        type: DataTypes.DATE,
    },
    file: {
        type: DataTypes.STRING(255),
    },
    accept: {
        type: DataTypes.ENUM('pdf', 'doc','docx','ppt','rar','zip','pptx'),
        allowNull:false
    },
}, {
    timestamps: false,
    tableName: 'tugas', // Gantilah 'tugas' dengan nama tabel yang sesuai
});
Tugas.belongsTo(Post, { foreignKey: "id_post", onDelete: "cascade" })

Post.hasMany(Tugas, {
    foreignKey: 'id_post',
    as: 'tugas',
});