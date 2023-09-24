import { Course } from "../model/schema/Course"

export const checkUsersAsInstructur = async (idUsers:number,idCourse:number)=>{
    try {
        const check= await Course.findOne({
            where:{
                id_users:idUsers,
                id_course:idCourse,
            }
        })
        return check ? true : false
    } catch (error) {
        throw error
    }
}