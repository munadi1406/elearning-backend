import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { Post } from "./Post";

export const Tugas = sequelize.define('Tugas', {
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
        type: DataTypes.ENUM('pdf', 'docx','docx','ppt','rar','zip'),
        allowNull:false
    },
}, {
    timestamps: false,
    tableName: 'tugas', // Gantilah 'tugas' dengan nama tabel yang sesuai
});
Tugas.belongsTo(Post, { foreignKey: "id_tugas", onDelete: "cascade" })
