import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db"
import { Presensi } from "./Presensi"

export const LogPresensi = sequelize.define('log_presensi', {
    id_log_presensi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true,
    },
    id_presensi: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_users:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    type_presensi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desc:{
        type:DataTypes.TEXT,
        allowNull:true,
    }
}, {
    indexes:[{
        fields:['id_users','status'],
        name:"idx_log_Presensi"
    }],
    timestamps: true,
    freezeTableName: true,
})
LogPresensi.belongsTo(Presensi, { foreignKey: "id_presensi", onDelete: "cascade", as: "Presensi" })
Presensi.hasMany(LogPresensi, { foreignKey: "id_presensi", onDelete: 'cascade', as: "logPresensi" })