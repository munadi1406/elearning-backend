import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { Course } from "./Course";
import { Users } from "./Users";

export const CourseMember:any = sequelize.define('coursemember', {
    id_member: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_course: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_users: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_member: {
        type: DataTypes.ENUM('member', 'instruktur'), // Sesuaikan dengan pilihan status yang Anda miliki
    },
    join_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

CourseMember.belongsTo(Course, {
    foreignKey: 'id_course',
    targetKey:'id_course',
    onDelete: 'CASCADE',
    as: 'course',
});
CourseMember.belongsTo(Users, {
    foreignKey: 'id_users',
    onDelete: 'CASCADE',
    as: 'users',
});