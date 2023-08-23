import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { Users } from "./Users";
import { Course } from "./Course";

export const Post = sequelize.define('Post', {
    id_post: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_course: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_users: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    judul: {
        type: DataTypes.STRING(100),
    },
    typePost: {
        type: DataTypes.ENUM('Pengumuman', 'Presensi', 'Kuis', 'Tugas'),
    },
}, {
    tableName: 'post',
    timestamps: true, // Atur ke true jika Anda ingin mengaktifkan kolom timestamp (created_at, updated_at)
    indexes: [
        {
            name: 'Post_id_course_fkey',
            fields: ['id_course'],
        },
        {
            name: 'Post_id_users_fkey',
            fields: ['id_users'],
        },
    ],
});
Post.belongsTo(Users, { foreignKey: "id_users", onDelete: "Cascade" })
Post.belongsTo(Course, { foreignKey: "id_course", onDelete: "cascade" })
