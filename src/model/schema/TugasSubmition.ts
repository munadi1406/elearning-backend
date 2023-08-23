import { DataTypes } from "sequelize";
import { Tugas } from "./Tugas";
import { sequelize } from "../../config/db";

export const TugasSubmission = sequelize.define('TugasSubmission', {
    id_tugas_submission: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_tugas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    file: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'tugassubmission', // Sesuaikan dengan nama tabel yang Anda gunakan
    timestamps: true, // Sesuaikan dengan kebutuhan Anda
    underscored: true, // Jika menggunakan snake_case untuk nama kolom dalam tabel
});
TugasSubmission.belongsTo(Tugas, { foreignKey: "id_tugas", onDelete: "cascade" })
