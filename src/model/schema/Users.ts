import { sequelize } from "../../config/db";
import { DataTypes, } from "sequelize";
import { TugasSubmission } from "./TugasSubmition";

export const Users = sequelize.define('users', {
    id_users: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(50),
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
    },
    phoneNumber: {
        type: DataTypes.STRING(15),
    },
    password: {
        type: DataTypes.TEXT,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'inactive',
    },

}, {
    freezeTableName: true, // Agar nama tabel tetap 'users'
    indexes: [
        {
            unique: true,
            fields: ['email'],
            name: 'idx_email',
        },
        {
            fields: ['username'],
            name: 'idx_username',
        },
        {
            fields: ['status'],
            name: 'idx_status',
        },
    ],
});
