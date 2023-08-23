import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { Users } from "./Users";

export const Otp = sequelize.define('otp', {
    id_otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    otp: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    otp_expires: {
        type: DataTypes.DATE(6),
        allowNull: false,
    },
    id_users: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'otp', // Nama tabel sesuaikan dengan nama tabel di database
    timestamps: true, // Tidak menggunakan kolom timestamps
});
Otp.belongsTo(Users, { foreignKey: "id_users", onDelete: "cascade",as:'user' })
