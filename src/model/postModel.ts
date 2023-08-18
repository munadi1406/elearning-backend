import { AccetpType, PrismaClient } from '@prisma/client';
import { checkMemberInCourse } from './courseModel';
import { createReadStream, existsSync, promises } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient()


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
        const insertPost = await prisma.post.create({
            data: {
                id_course: dataPayload.id_course,
                id_users: dataPayload.id_users,
                typePost: "Pengumuman",
                judul: `Pengumuman ${date}`,
                Pengumuman: {
                    create: {
                        konten: dataPayload.konten
                    }
                }
            },

        });
        return insertPost
    } catch (error) {
        throw error;
    }
}
interface ITugas extends IPost {
    deskripsi: string,
    fromDate: string,
    toDate: string,
    file?: string,
    accept: AccetpType
}


export const createTugas = async (dataPayload: ITugas) => {
    try {
        const checkUsersIsMember = await checkMemberInCourse(dataPayload.id_users, dataPayload.id_course);
        if (!checkUsersIsMember) {
            throw new Error('Anda Bukan Anggota Course Ini');
        }
        const date = new Date();
        const insertPost = await prisma.post.create({
            data: {
                id_course: dataPayload.id_course,
                id_users: dataPayload.id_users,
                typePost: "Tugas",
                judul: `Tugas ${date}`,
                Tugas: {
                    create: {
                        deskripsi: dataPayload.deskripsi,
                        fromDate: new Date(dataPayload.fromDate),
                        toDate: new Date(dataPayload.toDate),
                        file: dataPayload.file ?? '',
                        accept: dataPayload.accept,
                    }
                }
            },

        });
        return insertPost
    } catch (error) {
        throw error;
    }
}


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


export const getPost = async (id_course:number, id_post: number) => {
    try {
        const queryBuilder = prisma.post.findMany({
            select: {
                id_post: true,
                judul: true,
                typePost: true,
                created_at: true,
                Pengumuman: {
                    select: {
                        konten: true
                    }
                },
                Tugas: {
                    select: {
                        deskripsi: true
                    }
                }
            },
            where: {
                id_course,
                id_post: id_post > 0 ? { lt: id_post } : undefined,
            },
            take: 12,
            orderBy: {
                created_at: 'desc'
            }
        });

        const posts = await queryBuilder;
        let lastIdPost = null;

        if (posts.length > 0) {
            lastIdPost = posts[posts.length - 1].id_post;
        }

        return { lastIdPost, dataPost: posts };
    } catch (error) {
        throw error;
    }
};