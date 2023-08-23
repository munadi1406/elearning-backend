import { Sequelize } from "sequelize";



export const sequelize = new Sequelize('elearningverse', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});