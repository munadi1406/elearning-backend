import { Users } from "./schema/Users";
import { Course } from "./schema/Course";
import { CourseMember } from "./schema/CourseMember";
import { Op, QueryTypes, col } from "sequelize";
import { sequelize } from "../config/db";
import { existsSync } from "fs";
import { rimraf } from "rimraf";
import { join } from "path";
import { Post } from "./schema/Post";
import { Tugas } from "./schema/Tugas";
import { myCache } from "../middleware/cacheManager";

export const createCourse = async (data: any) => {
    const t = await sequelize.transaction()
    try {
        const courseName = data.course;
        const checkNameCourse = await Course.findOne({ where: { course: courseName } });
        const checkCode = await Course.findOne({ where: { course_code: data.course_code } });

        if (checkNameCourse) {
            return { status: false, msg: 'Nama Course Sudah Di Gunakan' };
        }

        if (checkCode) {
            return { status: false, msg: 'Course Code Tidak Valid , Coba Yang Lain' };
        }

        const insertCourse: any = await Course.create(data, { transaction: t });

        await CourseMember.create({
            id_course: insertCourse.id_course,
            id_users: data.id_users,
            status_member: 'instruktur',
        }, { transaction: t });
        await t.commit();
        return { status: true, msg: 'Course Success Created' };
    } catch (error) {
        console.log({ error })
        await t.rollback();
        throw error;
    }
};

// mendapatkan list course yang dia buat
// idcourse digunakan untuk lazy load 
export const getCourseByIdUsers = async (id_users: number, id_course: number) => {
    try {
        const dataCache = myCache.get(`courseByUsers-${id_users}-${id_course}`)
        if(dataCache){
            return dataCache
        }
        const courses = await Course.findAll({
            attributes: ['id_course', 'course', 'desc_course', 'academy', 'course_code',],
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                    as: 'user',
                },
            ],
            where: {
                id_users,
                ...(id_course > 0 ? { id_course: { [Op.lt]: id_course } } : {}),
            },
            limit: 10,
            order: [['createdAt', 'DESC']],
        });

        let lastIdCourse = null;
        if (courses.length > 0) {
            lastIdCourse = courses[courses.length - 1].getDataValue('id_course');
        }
        const payload  = {
            lastIdCourse, 
            dataCourse: courses
        }
        const payloadCopy = JSON.parse(JSON.stringify(payload))
        myCache.set(`courseByUsers-${id_users}-${id_course}`,payloadCopy)
        return payload;
    } catch (error) {
        throw error;
    }
};

Course.hasMany(CourseMember, {
    foreignKey: 'id_course',
    sourceKey: 'id_course',
    as: 'member',
});

export const detailCourse = async (id_users: number, id_course: number) => {
    try {
        const dataCache = myCache.get(`detailCourse-${id_users}-${id_course}`)
        if(dataCache){
            return dataCache
        }
        const courseDetails = await Course.findOne({
            attributes: ['id_course', 'course', 'desc_course', 'academy', 'course_code', 'createdAt'],
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['username'],
                },
                {
                    model: CourseMember,
                    attributes: ['status_member'],
                    as: 'member',
                    required: true,
                    where: {
                        id_users,
                    },
                },
            ],
            where: {
                id_course,
            },
        });
        const payloadCopy = JSON.parse(JSON.stringify(courseDetails))
        myCache.set(`detailCourse-${id_users}-${id_course}`,payloadCopy)
        return courseDetails;
    } catch (error) {
        throw error;
    }
};

export const deleteCourse = async (id_course: number, id_users: number) => {
    try {
        // Cek apakah pengguna memiliki akses ke kursus ini
        const checkAuthor = await Course.findOne({
            attributes: ['id_course'],
            where: {
                id_course,
                id_users,
            },
        });

        if (!checkAuthor) {
            return { status: false, message: "Anda Tidak Memiliki Akses Ke Course Ini" };
        }

        const getAllPostFile = await Post.findAll({
            attributes: [[col('tugas.id_tugas'), 'id_tugas']],
            include: {
                model: Tugas,
                attributes: [],
                as: 'tugas',
            },
            where: {
                id_course
            },
            raw: true,
        })

        console.log(getAllPostFile);

        getAllPostFile.map((e:any) => (
            deleteAllFileTugas(e.id_tugas)
        ))

        await Course.destroy({
            where: { id_course },
        });

        const courseFileLink = join(__dirname, `../uploads/course/${id_course}`)
        if (existsSync(courseFileLink)) {
            rimraf(courseFileLink)
        }

        return { status: true, message: "Course Berhasil Di Hapus" };
    } catch (error) {
        throw error;
    }
};

export const joinCourse = async (id_users: number, course_code: string) => {
    try {
        // Cek apakah pengguna sudah menjadi anggota di kursus ini
        const checkMember: any = await CourseMember.findOne({
            where: {
                id_users,
            },
            include: {
                model: Course,
                as: 'course',
                where: {
                    course_code,
                },
                attributes: ['course'],
            },
        });

        if (checkMember) {
            return { status: false, message: `Anda sudah bergabung di course ${checkMember.course.course}` };
        }

        // Cari kursus berdasarkan course_code
        const course: any = await Course.findOne({
            where: {
                course_code,
            },
        });

        if (!course) {
            return { status: false, message: "Course Tidak Ditemukan" };
        }

        // Tambahkan pengguna ke kursus sebagai member
        await CourseMember.create({
            id_users,
            id_course: course.id_course,
            status_member: 'member', // Sesuaikan dengan kebutuhan Anda
        });

        return { status: true, message: "Berhasil Bergabung Di Course" };
    } catch (error) {
        throw error;
    }
};

export const getCourseWhenUserAsMember = async (id_users: number, id_course: number) => {
    try {
        const dataCache = myCache.get(`courseAsMember-${id_users}-${id_course}`)
        if(dataCache){
            return dataCache
        }
        const courses = await Course.findAll({
            attributes: ['id_course', 'course', 'desc_course', 'academy', 'course_code'],
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                    as: 'user',
                },
                {
                    model: CourseMember,
                    required: true,
                    as: 'member',
                    where: {
                        id_users,
                        status_member: "member",
                    }
                }
            ],
            where: {
                ...(id_course > 0 ? { id_course: { [Op.lt]: id_course } } : {}),
            },
            orderBy: [['course.createdAt', 'desc']],
            limit: 10,
        });
        let lastIdCourse = null;
        if (courses.length > 0) {
            lastIdCourse = courses[courses.length - 1].id_course;
        }
        const payload  = {
            lastIdCourse, 
            dataCourse: courses
        }
        const payloadCopy = JSON.parse(JSON.stringify(payload))
        myCache.set(`courseAsMember-${id_users}-${id_course}`,payloadCopy)
        return payload;
    } catch (error) {
        throw error;
    }
};

export const listMemberInCourse = async (id_course: number, id_member: number) => {
    try {
        const dataCache = myCache.get(`courseMember-${id_course}-${id_member}`)
        if(dataCache){
            return { status: true, data:dataCache }
        }
        const data = await CourseMember.findAll({
            attributes: ['id_member', 'status_member'],
            include: [
                {
                    model: Users,
                    attributes: ['username', 'phoneNumber'],
                    as: 'users',
                },
            ],
            where: {
                id_course,
                ...(id_member > 0 ? { id_member: { [Op.gt]: id_member } } : {})
            },
            orderby: [['id_member', 'asc']]
        })

        let lastIdMember = null;
        if (data.length > 0) {
            lastIdMember = data[data.length - 1].id_member;
        }

        const payload  = {
            lastIdMember, 
            dataMember: data
        }
        const payloadCopy = JSON.parse(JSON.stringify(payload))
        myCache.set(`courseMember-${id_course}-${id_member}`,payloadCopy)
        return { status: true, data:payload }
    } catch (error) {
        throw error
    }
}

export const checkMemberInCourse = async (id_users: number, id_course: number) => {
    try {
        const check = await CourseMember.findOne({
            where: {
                id_users,
                id_course,
            },
        });

        return !!check;
    } catch (error) {
        throw error;
    }
};


const deleteAllFileTugas = async (idTugas: number) => {
    const linkFileTugasSubmit = join(__dirname, `../uploads/tugas/${idTugas}`)
    if (existsSync(linkFileTugasSubmit)) {
        await rimraf(linkFileTugasSubmit)
    }
}