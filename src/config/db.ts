import { Sequelize } from "sequelize";



export const sequelize = new Sequelize('elearningverse', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export const sync = async ()=>{
  try {
    await sequelize.authenticate()
    // await sequelize.sync()
  } catch (error) {
    throw error
  }
}