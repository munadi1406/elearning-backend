import express from 'express'
import { auth, createUser, handleImageUpload, loadImageUsers, logout } from '../controllers/usersController'
import { newOtpReq, otpAuthCheck } from '../controllers/otpController'
import { createCourses, getDetailCourse, listCourseWhenUsersAsInstructor, listCourseWhenUsersAsMember, reqDeleteCourse, reqJoinCourse } from '../controllers/courseController'
import { verifyTokenMiddleware } from '../middleware/jwtCheck'
import { reqNewAccessToken } from '../controllers/jwtController'
import { accessCourse } from '../middleware/accessCourse'
import { downloadFileTugas, handleCreatePengumuman, handleCreateTugas, handleGetPost } from '../controllers/postController'

const route = express.Router()


route.post("/users", createUser)
route.post("/otpcheck", otpAuthCheck)
route.post("/newotp", newOtpReq)
route.post("/auth", auth)
route.post("/new-access-token", reqNewAccessToken)
route.put("/logout", verifyTokenMiddleware, logout)
route.put("/users/image", verifyTokenMiddleware, handleImageUpload);
route.get("/image/:idUsers/:imageName", loadImageUsers);


route.post('/course', verifyTokenMiddleware, createCourses)
route.get('/course/:idCourse', verifyTokenMiddleware, listCourseWhenUsersAsInstructor)
route.get('/course/member/:idCourse', verifyTokenMiddleware, listCourseWhenUsersAsMember)
route.get('/course/detail/:idCourse', verifyTokenMiddleware, accessCourse, getDetailCourse)
route.post('/course/join', verifyTokenMiddleware, reqJoinCourse)
route.delete('/course', verifyTokenMiddleware, reqDeleteCourse)



route.get('/post/:idCourse/:idPost', verifyTokenMiddleware, accessCourse, handleGetPost)
route.post('/pengumuman', verifyTokenMiddleware, accessCourse, handleCreatePengumuman)
route.post('/tugas', verifyTokenMiddleware, handleCreateTugas)


route.get('/file/:idCourse/:fileName',downloadFileTugas)
export default route;