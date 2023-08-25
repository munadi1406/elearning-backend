import { checkMemberInCourse } from './courseModel';
import {  existsSync, promises, unlinkSync } from 'fs';
import { join } from 'path';
import { Op } from 'sequelize';
import { Post } from './schema/Post';
import { Pengumuman } from './schema/Pengumuman';
import { Tugas } from './schema/Tugas';
import { TugasSubmission } from './schema/TugasSubmition';
import { Course } from './schema/Course';
import { sequelize } from "../config/db";
import {rimraf} from 'rimraf'

interface IPost {
    id_users: number,
    id_course: number,
}
interface IPengumuman extends IPost {
    konten: string,
}



export const createPengumuman = async (dataPayload: IPengumuman) => {
    try {
        const checkUsersIsMember = await checkMemberInCourse(dataPayload.id_users, dataPayload.id_course);
        if (!checkUsersIsMember) {
            throw new Error('Anda Bukan Anggota Course Ini');
        }

        const date = new Date();

        // Buat post baru dengan tipe "Pengumuman"
        const newPost: any = await Post.create({
            id_course: dataPayload.id_course,
            id_users: dataPayload.id_users,
            typePost: 'Pengumuman',
            judul: `Pengumuman ${date}`,
        });

        // Buat data Pengumuman yang terkait
        await Pengumuman.create({
            id_post: newPost.id_post,
            konten: dataPayload.konten,
        });

        return newPost;
    } catch (error) {
        throw error;
    }
};



interface ITugas extends IPost {
    deskripsi: string,
    fromDate: string,
    toDate: string,
    file?: string,
    accept: string
}


export const createTugas = async (dataPayload: ITugas) => {
  const t = await sequelize.transaction()
    try {
        const checkIsAuthor = await Course.findOne({
            where: {
                id_users: dataPayload.id_users,
                id_course: dataPayload.id_course,
            },
        });

        if (!checkIsAuthor) {
            throw new Error('Anda Bukan Anggota Course Ini');
        }

        const date = new Date().toLocaleString();

        // Buat post baru dengan tipe "Tugas"
        const newPost: any = await Post.create({
            id_course: dataPayload.id_course,
            id_users: dataPayload.id_users,
            typePost: 'Tugas',
            judul: `Tugas ${date}`,
        },{transaction:t});
        // Buat data Tugas yang terkait
        const tes = await Tugas.create({
            id_post: newPost.id_post,
            deskripsi: dataPayload.deskripsi,
            fromDate: new Date(dataPayload.fromDate).toISOString(),
            toDate: new Date(dataPayload.toDate).toISOString(),
            file: dataPayload.file || '',
            accept: dataPayload.accept,
        },{transaction:t});
      await t.commit()
        return newPost;
    } catch (error) {
      await t.rollback()
        throw error;
    } 
};


export const streamFile = async (id_course: string, fileName: string) => {
    try {
        const filePath = join(__dirname, `../uploads/course/${id_course}/${fileName}`);
        if (!existsSync(filePath)) {
            throw new Error()
        } else {
            return await promises.readFile(filePath);
        }
    } catch (error) {
        throw error;
    }
};



export const getPost = async (id_course: number, id_post: number) => {
    try {
        const getListPost: any = await Post.findAll(
            {
                attributes: ["id_post",
                    "judul",
                    "typePost",
                    "createdAt",
                    "updatedAt",],
                include: [{
                    model: Pengumuman,
                    association:'pengumuman'
                }, {
                    model: Tugas,
                    association:'tugas'
                }],
                where: {
                    id_course,
                    ...(id_post > 0 ? { id_post: { [Op.lt]: id_post } } : {}),
                },
              order: [['createdAt', 'desc']],
            }
        );
        let lastIdPost = null;

        if (getListPost.length > 0) {
            lastIdPost = getListPost[getListPost.length - 1].id_post;
        }

        return { lastIdPost, dataPost: getListPost };
    } catch (error) {
        throw error;
    }
};

export const getDetailPost = async (id_post: number, id_users: number) => {
    try {
        const post = await Post.findByPk(id_post, {
            include: [
                {
                    model: Pengumuman,
                    association:'pengumuman',
                    attributes: ['konten'],
                    required: false,
                },
                {
                    model: Tugas,
                    attributes: ['id_tugas', 'deskripsi', 'fromDate', 'toDate', 'file', 'accept'],
                    association:'tugas',
                    required:false,
                    include: [
                        {
                            model: TugasSubmission,
                            attributes: ['file', 'createdAt'],
                            association:'tugassubmission',
                            where: {
                                id_user: id_users,
                            },
                            required: false,
                        },
                    ],
                },
            ],
        });


        return post;
    } catch (error) {
        throw error;
    }
};


export const deletePost = async (id_post: number, id_users: number) => {
    try {
        console.log({id_post})
        const post: any = await Post.findByPk(id_post);
        if (!post) {
            throw new Error('Post not found');
        }

        const course = await Course.findOne({
            where: {
                id_course: post.id_course,
                id_users,
            },
        });

        if (!course) {
            return { status: false, message: "Anda Tidak Memiliki Akses Ke Course Ini" };
        }
        const idTugas:any = await Tugas.findOne({where:{id_post:post.id_post}})
        await post.destroy({where:{id_post}});
        const linkFileTugas =  join(__dirname ,`../uploads/course/${post.id_course}/${idTugas?.file}`)
        if(existsSync(linkFileTugas)){
            unlinkSync(linkFileTugas)
        }
        const linkFileTugasSubmit = join(__dirname ,`../uploads/tugas/${idTugas?.id_tugas}`)
        if(existsSync(linkFileTugasSubmit)){
            await rimraf(linkFileTugasSubmit)
        }
        return { status: true, message: "Postingan Berhasil Di Hapus" };
    } catch (error) {
        throw error;
    }
};
