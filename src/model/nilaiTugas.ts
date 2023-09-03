import { CourseMember } from "./schema/CourseMember";
import { NilaiTugas } from "./schema/NilaiTugas";
import { Post } from "./schema/Post";
import { Tugas } from "./schema/Tugas";
import { TugasSubmission } from "./schema/TugasSubmition";

export const insertNilaiTugas = async (id_users: number, id_tugas_submission: number, nilai: string, idAuthor: number) => {
    try {
        if(Number(nilai) > 100){
            return { status: false, message: "Nilai Harus Antara 1 - 100" }
        }
        const checkAccess = await CourseMember.findOne({
            attributes:['id_member'],
            inlcude: {
                attributes:['id_post'],
                model: Post,
                as: 'post',
                include: [{
                    attributes:['id_tugas'],
                    model: Tugas,
                    as: 'tugas',
                    include: [{
                        attributes:['id_tugas_submission'],
                        model: TugasSubmission,
                        as: "tugassubmission",
                        required:true,
                        where: {
                            id_tugas_submission
                        }
                    }]
                }]
            },
            where:{
                status_member:"instruktur",
                id_users:idAuthor,
            }
        })
        if (!checkAccess) return { status: false, message: "Anda Tidak Memiliki Akses Di Course Ini" }

        const checkNilai = await NilaiTugas.findOne({
            attributes:['nilai'],
            where: {
                id_tugas_submission,
                id_users,
            }
        })
        if (checkNilai) {
            await NilaiTugas.update({ nilai }, {
                where: {
                    id_tugas_submission: id_tugas_submission,
                    id_users: id_users,
                }

            })
        } else {
            await NilaiTugas.create({
                id_tugas_submission: id_tugas_submission,
                id_users: id_users,
                nilai: nilai
            })
        }
        return { status: true, message: 'nilai Berhasil Di Post' }
    } catch (error) {
        console.log(error)
        throw error;
    }
};