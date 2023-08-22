import { PrismaClient } from "@prisma/client";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient()


export const submitTugas = async (id_users: number, id_tugas: number, file: string) => {
    try {
        const getIdPost = await prisma.post.findFirst({
            select: {
                id_course: true,
                Tugas: { select: { accept: true, toDate: true } }
            },
            where: {
                Tugas: {
                    some: {
                        id_tugas
                    }
                }
            }
        })
        const checkMembers = await prisma.courseMember.findFirst({
            where: {
                id_course: getIdPost?.id_course,
                id_users,
                status_member: "member"
            }
        })
        if (!checkMembers || !getIdPost) {
            deleteFileIfUploadFailed(id_tugas, id_users, file)
            return {
                status: false, message: "Anda Tidak Bisa Mengirim Tugas"
            }
        };
        const currentDate = new Date();
        const toDate = getIdPost?.Tugas?.[0]?.toDate;
        const parsedDate = toDate ? new Date(toDate) : null;
        if (parsedDate && currentDate > parsedDate) {
            deleteFileIfUploadFailed(id_tugas, id_users, file)
            return { status: false, message: "Waktu Pengumpulan Sudah Habis" }
        }
        const fileType: any = getIdPost?.Tugas[0].accept
        const fileExt = file.split('.')
        if (fileExt[1] !== fileType.toLowerCase()) {
            deleteFileIfUploadFailed(id_tugas, id_users, file)
            return { status: false, message: "File Yang Anda Upload Tidak Sesuai dengan Yang diminta" }
        };
        
        const postTugas = await prisma.tugasSubmission.create({
            data: {
                id_tugas,
                id_user: id_users,
                file,
            }
        })
        if(!postTugas){
            throw new Error("constraint")
        }
        return { status: true, message: "Tugas Berhasil Dikirim" };
    } catch (error) {
        deleteFileIfUploadFailed(id_tugas, id_users, file)
        throw error;
    }
}


const deleteFileIfUploadFailed = (id_tugas: number, id_users: number, file: string) => {
    const filePath = join(__dirname, `../uploads/tugas/${id_tugas}/${id_users}/${file}`);
    if (existsSync(filePath)) {
        unlinkSync(filePath);
    }
}