import express from 'express'
import { auth, createUser, handleChangePassword, handleChangeUsername, handleDetailUsers, handleImageUpload, loadImageUsers, logout } from '../controllers/usersController'
import { newOtpReq, otpAuthCheck } from '../controllers/otpController'
import { createCourses, getDetailCourse, handleListMemberInCouse, listCourseWhenUsersAsInstructor, listCourseWhenUsersAsMember, reqDeleteCourse, reqJoinCourse } from '../controllers/courseController'
import { verifyTokenMiddleware } from '../middleware/jwtCheck'
import { reqNewAccessToken } from '../controllers/jwtController'
import { accessCourse } from '../middleware/accessCourse'
import { downloadFileTugas, handleCreatePengumuman, handleCreateTugas, handleDeletePost, handleDetailPost, handleGetPost, handleUploadTugas } from '../controllers/postController'
import { handleCancelSubmitTugas, handleDownloadFileTugasSubmit, handleGetListSubmitTugas, handleListTugas, handleNilaiInsert, handlePreviewFIleTugasSubmit } from '../controllers/tugasController'
import { handleCreateQuis, handleGetQuiz, handleQuizTaking } from '../controllers/quizController'

const route = express.Router()


route.post("/users", createUser)
route.post("/otpcheck", otpAuthCheck)
route.post("/newotp", newOtpReq)
route.post("/auth", auth)
route.post("/new-access-token", reqNewAccessToken)
route.put("/logout", verifyTokenMiddleware, logout)
route.put("/users/image", verifyTokenMiddleware, handleImageUpload);
route.get("/image/:idUsers/:imageName", loadImageUsers);
route.get("/users",verifyTokenMiddleware,handleDetailUsers)

route.post("/users/changeUsername",verifyTokenMiddleware,handleChangeUsername)
route.post("/users/changePassword",verifyTokenMiddleware,handleChangePassword)



route.post('/course', verifyTokenMiddleware, createCourses)
route.get('/course/:idCourse', verifyTokenMiddleware, listCourseWhenUsersAsInstructor)
route.get('/course/member/:idCourse', verifyTokenMiddleware, listCourseWhenUsersAsMember)
route.get('/course/detail/:idCourse', verifyTokenMiddleware, accessCourse, getDetailCourse)
route.post('/course/join', verifyTokenMiddleware, reqJoinCourse)
route.delete('/course/:idCourse', verifyTokenMiddleware, reqDeleteCourse)
route.get('/course/listmember/:idCourse/:idMember', verifyTokenMiddleware,accessCourse,handleListMemberInCouse)




route.get('/post/:idPost', verifyTokenMiddleware, handleDetailPost)
route.get('/post/:idCourse/:idPost', verifyTokenMiddleware, accessCourse, handleGetPost)
route.post('/pengumuman', verifyTokenMiddleware, accessCourse, handleCreatePengumuman)
route.delete('/post/:idPost',verifyTokenMiddleware,handleDeletePost)

route.post('/tugas', verifyTokenMiddleware, handleCreateTugas)
route.post('/tugas/submit', verifyTokenMiddleware, handleUploadTugas)
route.post('/tugas/cancelsubmit', verifyTokenMiddleware, handleCancelSubmitTugas)
route.get('/tugas/listsubmit/:idTugas',verifyTokenMiddleware,handleGetListSubmitTugas)
route.get('/tugas/:idPost',verifyTokenMiddleware,handleListTugas)

route.post('/nilai',verifyTokenMiddleware,handleNilaiInsert)


route.post('/quis',verifyTokenMiddleware,handleCreateQuis)
route.get('/question/:idQuestion',verifyTokenMiddleware,handleGetQuiz)   //mendapatkan soal quiz
route.get('/quiz/:idQuiz',verifyTokenMiddleware,handleQuizTaking) //mendapatkan seluruh id quiz untuk navigasi dan memulai quiz

route.get('/file/:idCourse/:fileName',downloadFileTugas) // download file tugas 
route.get('/fileTugas/:idTugas/:idUsers/:fileName',handleDownloadFileTugasSubmit) // download file tugas dari users (pengumpulan)
route.get('/fileTugasPreview/:idTugas/:idUsers/:fileName',handlePreviewFIleTugasSubmit) // download file tugas dari users (pengumpulan)

export default route; 