import { existsSync, promises, unlinkSync } from "fs";
import { join } from "path";
import { CourseMember } from "./schema/CourseMember";
import { Post } from "./schema/Post";
import { Tugas } from "./schema/Tugas";
import { TugasSubmission } from "./schema/TugasSubmition";
import { Users } from "./schema/Users";
import { NilaiTugas } from "./schema/NilaiTugas";
import {  QueryTypes, col } from "sequelize";
import { sequelize } from "../config/db";
import { Course } from "./schema/Course";




export const submitTugas = async (id_users: number, id_tugas: number, file: string) => {
  try {
    const getIdPost: any = await Tugas.findOne({
      where: {
        id_tugas
      }
    })
    const getIdCourse: any = await Post.findOne({
      where: {
        id_post: getIdPost.id_post
      }
    })
    const checkMember = await CourseMember.findOne({
      where: {
        id_course: getIdCourse.id_course,
        status_member: "member"
      }
    })
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
      return { status: false, message: `File Yang Anda Upload Tidak Sesuai dengan Yang diminta, File Yang Di Minta ${fileType}` };
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

export const detailTugas = async (id_post:number,id_users:number)=>{
  try {
    const tugas = await Post.findByPk(id_post, {
      attributes: [
          'id_post',
          [col('tugas.id_tugas'), 'id_tugas'],
          [col('tugas.tugassubmission.id_tugas_submission'), 'id_tugas_submission'],
          [col('users.username'), 'username'],
          'judul',
          'typePost',
          [col('tugas.deskripsi'), 'deskripsi'],
          [col('tugas.fromDate'), 'fromDate'],
          [col('tugas.toDate'), 'toDate'],
          [col('tugas.file'), 'file'],
          [col('tugas.accept'), 'accept'],
          [col('tugas.tugassubmission.file'), 'fileIsSubmit'],
          [col('tugas.tugassubmission.createdAt'), 'submitAt'],
          [col('tugas.tugassubmission.nilai.id_nilai_tugas'), 'id_nilai_tugas'],
          [col('tugas.tugassubmission.nilai.nilai'), 'nilai'],
      ],
      include: [
          {
              model: Users,
              attributes: [],
              as: "users",
          },
          {
              model: Tugas,
              attributes: [],
              association: 'tugas',
              required: false,
              include: [
                  {
                      model: TugasSubmission,
                      attributes: [],
                      association: 'tugassubmission',
                      where: {
                          id_user: id_users,
                      },
                      required: false,
                      include: [{
                          attributes: [],
                          model: NilaiTugas,
                          as: "nilai"
                      }]
                  },
              ],
          },
      ],
      raw: true,
  });
  return tugas;
  } catch (error) {
    throw error
  }
}


export const listTugas = async (id_users: number, id_post: number) => {
  try {
    // query dari course_members
    // lalu inner join ke course kerena course_member memiliki id course
    // lalu inner join ke users dari course karena course memiliki id_users
    // lalu inner join ke post dari course karena post memilik id_course
    //lalu innert join ke tugas dari post karena tugas memiliki id_post
    const dataTugasQuery = `
    SELECT
      post.id_post AS id_post,
      course.course AS course,
      users.username AS username,
      post.judul AS judul,
      post_tugas.deskripsi AS deskripsi,
      post_tugas.fromDate AS fromDate,
      post_tugas.toDate AS toDate
    FROM
      coursemembers AS CourseMember
    INNER JOIN
      course AS course
    ON
      CourseMember.id_course = course.id_course
    INNER JOIN
      users AS users
    ON
      course.id_users = users.id_users
    INNER JOIN
      post AS post
    ON
      course.id_course = post.id_course
    AND
      post.typePost = 'tugas'
    INNER JOIN
      tugas AS post_tugas
    ON
      post.id_post = post_tugas.id_post
    AND
      post_tugas.toDate > :currentDate
    WHERE
      CourseMember.id_users = :id_users
    AND
      CourseMember.status_member = 'member'
    ${id_post > 0 ? 'AND post.id_post > :id_post' : ''}
    LIMIT 10;
    
  `;

    const currentDate = new Date();
    const dataTugas: any = await sequelize.query(dataTugasQuery, {
      replacements: { id_users, id_post, currentDate },
      type: QueryTypes.SELECT,
      raw: true,
    });
    let lastIdPost = null;
    if (dataTugas.length > 0) {
      lastIdPost = await dataTugas[dataTugas.length - 1].id_post
    }

    return { status: true, datas: { lastIdPost, dataTugas } };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const cancelSubmitTugas = async (id_users: number, id_tugas_submission: number) => {
  try {
    const dataCheck: any = await Post.findOne({
      include: {
        model: Tugas,
        as: "tugas",
        include: [
          {
            model: TugasSubmission,
            as: 'tugassubmission',
            where: {
              id_tugas_submission,
              id_user: id_users
            }
          },
        ]
      }
    });
    if (!dataCheck) return { status: false, message: "Anda Tidak Memiliki Akses" }
    const idTugas = dataCheck?.tugas[0].id_tugas
    const fileName = dataCheck?.tugas[0].tugassubmission[0].file
    const idTugasSubmission = dataCheck?.tugas[0].tugassubmission[0].id_tugas_submission
    await TugasSubmission.destroy({ where: { id_tugas_submission: idTugasSubmission } })
    deleteFileIfUploadFailed(idTugas, id_users, fileName)
    return { status: false, message: "Pengumpulan Tugas Berhasil Di Batalkan" }
  } catch (error) {
    throw error;
  }
}


export const listSubmitTugas = async (id_tugas: number,id_users:number) => {
  try {
    const checkIsInstruktur  = await Course.findOne({
      include:{
        model:Post,
        as:"post",
        include:[{
          model:Tugas,
          as:'tugas',
          where:{
            id_tugas,
          }
        }]
      },
      where:{
        id_users
      }
    })
    if(!checkIsInstruktur){
      return {status:false,message:"Anda Tidak Memiliki Akses"}
    }
    const data = await Tugas.findAll({
      include: {
        model: TugasSubmission,
        attributes: ['id_tugas_submission', 'createdAt', 'file'],
        as: "tugassubmission",
        include: [
          {
            model: Users,
            attributes: ['id_users', 'username', 'image'],
            as: 'users',
          }, {
            model: NilaiTugas,
            as: 'nilai'
          }
        ]
      },
      where: { id_tugas }
    })
    return {status:true,data}
  } catch (error) {
    throw error
  }
}

export const downloadFileTugasSubmit = async (idTugas: number, idUsers:number,fileName: string) => {
  try {
      const filePath = join(__dirname, `../uploads/tugas/${idTugas}/${idUsers}/${fileName}`);
      if (!existsSync(filePath)) {
          throw new Error()
      } else {
          return await promises.readFile(filePath);
      }
  } catch (error) {
      throw error;
  }
};

const deleteFileIfUploadFailed = (id_tugas: number, id_users: number, file: string) => {
  const filePath = join(__dirname, `../uploads/tugas/${id_tugas}/${id_users}/${file}`);
  if (existsSync(filePath)) {
    unlinkSync(filePath);
  }
}