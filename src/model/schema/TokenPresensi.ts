import { DataTypes } from "sequelize"
import { sequelize } from "../../config/db"
import { Presensi } from "./Presensi"

export const TokenPresensi = sequelize.define('token_presensi', {
    id_presensi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    }
}, {
    indexes:[{
        fields:['token'],
        unique:true,
        name:"idx_token",
    }],
    timestamps: true,
    freezeTableName: true,
})
TokenPresensi.belongsTo(Presensi, { foreignKey: "id_presensi", onDelete: "cascade", as: "Presensi" })
Presensi.hasMany(TokenPresensi, { foreignKey: "id_presensi", onDelete: 'cascade', as: "token" }) 