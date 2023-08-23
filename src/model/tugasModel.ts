import { existsSync, unlinkSync } from "fs";
import { join } from "path";
import { CourseMember } from "./schema/CourseMember";
import { Post } from "./schema/Post";
import { Tugas } from "./schema/Tugas";
import { TugasSubmission } from "./schema/TugasSubmition";




  export const submitTugas = async (id_users:number, id_tugas:number, file:string) => {
    try {
      const getIdPost:any = await Tugas.findOne({where:{
        id_tugas
      }})
      const getIdCourse:any = await Post.findOne({where:{
        id_post:getIdPost.id_post
      }})
      const checkMember = await CourseMember.findOne({where:{
        id_course:getIdCourse.id_course,
        status_member:"member"
      }})
  
      if (!getIdPost || !checkMember) {
        deleteFileIfUploadFailed(id_tugas, id_users, file);
        return { status: false, message: 'Anda Tidak Bisa Mengirim Tugas' };
      }
  
      const currentDate = new Date();
      const toDate = new Date(getIdPost.toDate);
  
      if (currentDate > toDate) {
        deleteFileIfUploadFailed(id_tugas, id_users, file);
        return { status: false, message: 'Waktu Pengumpulan Sudah Habis' };
      }
  
      const fileType = getIdPost.accept;
      const fileExt = file.split('.')[1];
  
      if (fileExt !== fileType.toLowerCase()) {
        deleteFileIfUploadFailed(id_tugas, id_users, file);
        return { status: false, message: 'File Yang Anda Upload Tidak Sesuai dengan Yang diminta' };
      }
  
      // Simpan pengumpulan tugas ke dalam database
      await TugasSubmission.create({
        id_tugas,
        id_user: id_users,
        file,
      });
  
      return { status: true, message: 'Tugas Berhasil Dikirim' };
    } catch (error) {
      deleteFileIfUploadFailed(id_tugas, id_users, file);
      throw error;
    }
  };


const deleteFileIfUploadFailed = (id_tugas: number, id_users: number, file: string) => {
    const filePath = join(__dirname, `../uploads/tugas/${id_tugas}/${id_users}/${file}`);
    if (existsSync(filePath)) {
        unlinkSync(filePath);
    }
}