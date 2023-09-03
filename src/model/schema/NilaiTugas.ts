import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { TugasSubmission } from "./TugasSubmition";
import { Users } from "./Users";

export const NilaiTugas = sequelize.define('nilai_tugas', {
    id_nilai_tugas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    id_tugas_submission: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_users: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nilai: {
        type: DataTypes.STRING(3),
        allowNull: false,
    },
}, {
    tableName: 'nilai_tugas',
    timestamps: true,
    freezeTableName: true,
    indexes: [{
        fields: ['id_tugas_submission', 'id_users'],
        unique:true
    }
    ]
});
NilaiTugas.belongsTo(TugasSubmission, { foreignKey: "id_tugas_submission", onDelete: "cascade", as: 'tugassubmission' })
NilaiTugas.belongsTo(Users, { foreignKey: "id_users", onDelete: "cascade", as: 'user' })
TugasSubmission.hasMany(NilaiTugas,{foreignKey:'id_tugas_submission',as:'nilai'})
Users.hasMany(NilaiTugas,{foreignKey:'id_users'})