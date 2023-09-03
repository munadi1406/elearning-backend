import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db";
import { Users } from "./Users";
import { CourseMember } from "./CourseMember";

export const Course: any = sequelize.define('course', {
    id_course: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_users: {
        type: DataTypes.INTEGER,
    },
    course: {
        type: DataTypes.STRING(255),
    },
    desc_course: {
        type: DataTypes.TEXT,
    },
    academy: {
        type: DataTypes.STRING(100),
    },
    course_code: {
        type: DataTypes.STRING(50),
    },
},
    {
        timestamps: true,
        freezeTableName: true,
    });
Course.belongsTo(Users, { foreignKey: 'id_users', onDelete: "cascade", as: 'user' })

