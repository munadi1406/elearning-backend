import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db"
import { Presensi } from "./Presensi"

export const QRCodePresensi = sequelize.define('qrcode_presensi', {
    id_presensi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    qrcode_token:{
        type:DataTypes.STRING,
        allowNull:false,
    }
}, {
    indexes:[{
        fields:['qrcode_token'],
        name:"idx_qrcode_token"
    }],
    timestamps: true,
    freezeTableName: true,
})
QRCodePresensi.belongsTo(Presensi, { foreignKey: "id_presensi", onDelete: "cascade", as: "Presensi" })
Presensi.hasMany(QRCodePresensi, { foreignKey: "id_presensi", onDelete: 'cascade', as: "qrcode" })