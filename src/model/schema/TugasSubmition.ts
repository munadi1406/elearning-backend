import { DataTypes } from "sequelize";
import { Tugas } from "./Tugas";
import { sequelize } from "../../config/db";
import { Users } from "./Users";

export const TugasSubmission = sequelize.define('tugassubmission', {
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
});
TugasSubmission.belongsTo(Tugas, { foreignKey: "id_tugas", onDelete: "cascade" })
TugasSubmission.belongsTo(Users, { foreignKey: "id_user", onDelete: "cascade" ,as:'users'})
Tugas.hasMany(TugasSubmission, {
    foreignKey: 'id_tugas',
    as: 'tugassubmission',
});