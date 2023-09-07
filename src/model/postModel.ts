import { checkMemberInCourse } from './courseModel';
import { existsSync, promises, unlinkSync } from 'fs';
import { join } from 'path';
import { Op, col } from 'sequelize';
import { Post } from './schema/Post';
import { Pengumuman } from './schema/Pengumuman';
import { Tugas } from './schema/Tugas';
import { TugasSubmission } from './schema/TugasSubmition';
import { Course } from './schema/Course';
import { sequelize } from "../config/db";
import { rimraf } from 'rimraf'
import { Users } from './schema/Users';
import { NilaiTugas } from './schema/NilaiTugas';
import { Quiz } from './schema/Quiz';
import { Question } from './schema/Question';
import { AnswerOption } from './schema/AnswerOption';
import { detailQuiz } from './QuizModel';
import { detailPengumuman } from './PengumumanModel';
import { detailTugas } from './tugasModel';

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

        const date = new Date().toISOString();

        // Buat post baru dengan tipe "Tugas"
        const newPost: any = await Post.create({
            id_course: dataPayload.id_course,
            id_users: dataPayload.id_users,
            typePost: 'Tugas',
            judul: `Tugas ${date}`,
        }, { transaction: t });
        // Buat data Tugas yang terkait
        await Tugas.create({
            id_post: newPost.id_post,
            deskripsi: dataPayload.deskripsi,
            fromDate: new Date(dataPayload.fromDate).toISOString(),
            toDate: new Date(dataPayload.toDate).toISOString(),
            file: dataPayload.file || '',
            accept: dataPayload.accept,
        }, { transaction: t });
        await t.commit()
        return newPost;
    } catch (error) {
        await t.rollback()
        console.log(error)
        throw error;
    }
};

// download file tugas
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
                    association: 'pengumuman'
                }, {
                    model: Tugas,
                    association: 'tugas'
                }, {
                    model: Quiz,
                    as: 'kuis',
                }],
                where: {
                    id_course,
                    ...(id_post > 0 ? { id_post: { [Op.lt]: id_post } } : {}),
                },
                order: [['createdAt', 'desc']],
                limit: 10,
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


        const typePost: any = await Post.findByPk(id_post, {
            attributes: ['typePost'],
        });
        if (!typePost) {
            return []
        }

        if (typePost.typePost === "Kuis") {
            const data = await detailQuiz(id_post)
            return data
        } else if (typePost.typePost === 'Pengumuman') {
            const data = await detailPengumuman(id_post)
            return data
        } else if (typePost.typePost === 'Tugas') {
            const tugas = await detailTugas(id_post, id_users)
            return tugas
        } else {
            return [];
        }
        // return post;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const deletePost = async (id_post: number, id_users: number) => {
    try {
        console.log({ id_post })
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
        const idTugas: any = await Tugas.findOne({ where: { id_post: post.id_post } })
        await post.destroy({ where: { id_post } });
        if (idTugas.file) {
            const linkFileTugas = join(__dirname, `../uploads/course/${post.id_course}/${idTugas.file}`)
            if (existsSync(linkFileTugas)) {
                unlinkSync(linkFileTugas)
            }
        }
        const linkFileTugasSubmit = join(__dirname, `../uploads/tugas/${idTugas.id_tugas}`)
        if (existsSync(linkFileTugasSubmit)) {
            await rimraf(linkFileTugasSubmit)
        }
        return { status: true, message: "Postingan Berhasil Di Hapus" };
    } catch (error) {
        throw error;
    }
};
