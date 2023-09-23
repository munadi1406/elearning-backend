import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db"
import { Presensi } from "./Presensi"

export const GpsPresensi = sequelize.define('gps_presensi', {
    id_presensi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    name_location:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    gps_latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
    },
    gps_longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
    },
}, {
    timestamps: true,
    freezeTableName: true,
})
GpsPresensi.belongsTo(Presensi, { foreignKey: "id_presensi", onDelete: "cascade", as: "Presensi" })
Presensi.hasMany(GpsPresensi, { foreignKey: "id_presensi", onDelete: 'cascade', as: "gps" })