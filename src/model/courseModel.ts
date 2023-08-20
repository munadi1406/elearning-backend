import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCourse = async (data: any) => {
    try {
        const courseName = data.course;
        const checkNameCourse = await prisma.course.findFirst({
            where: { course: courseName },
        });
        const checkCode = await prisma.course.findFirst({
            where: { course_code: data.course_code },
        });
        if (checkNameCourse)
            return { status: false, msg: 'Nama Course Sudah Di Gunakan' };
        if (checkCode)
            return { status: false, msg: 'Course Code Tidak Valid , Coba Yang Lain' };

        await prisma.$transaction([
            prisma.course.create({
                data: {
                    ...data,
                    CourseMember: {
                        create: {
                            id_users: data.id_users,
                            status_member: 'instruktur',
                        },
                    },
                },
            }),
        ]);
        return { status: true, msg: 'Course Success Created' };
    } catch (error) {
        throw error;
    }
};

// mendapatkan list course yang dia buat
// idcourse digunakan untuk lazy load 
export const getCourseByIdUsers = async (id_users: number , id_course: number ) => {
    try {
        const courses = await prisma.course.findMany({
            select: {
                id_course: true,
                user: { select: { username: true, } },
                course: true,
                desc_course: true,
                academy: true,
                course_code: true,
            },
            where: {
                id_users,
                id_course: id_course > 0 ? { lt: id_course } : undefined,
            },
            take: 10,
            orderBy: { created_at: 'desc' },
        });
        let lastIdCourse = null;
        if (courses.length > 0) {
            lastIdCourse = courses[courses.length - 1].id_course;
        }

        return { lastIdCourse, dataCourse: courses };
    } catch (error) {
        throw error;
    }
};


export const detailCourse = async (id_users: number, id_course: number) => {
    try {
      const testing = await prisma.course.findFirst({
        select:{
            id_course:true,
            course:true,
            desc_course:true,
            academy:true,
            course_code:true,
            created_at:true,
            user:{select:{username:true}},
            CourseMember:{
                select:{
                    status_member:true
                },
                where:{
                    id_users
                }
            }
        },
        where:{
            id_course
        }
      })
        return testing;
    } catch (error) {
        throw error;
    }
};

export const deleteCourse = async (id_course: number,id_users:number) => {
    try {
       
        const checkAuthor = await prisma.course.findFirst({
            where:{
                id_course,
                id_users,
            }
        })
        if(!checkAuthor) return {status:false,message:"Anda Tidak Memiliki Akses Ke Course Ini"}
        await prisma.course.delete({
            where: { id_course: id_course },
        });

        return {status:true,message:"Course Berhasil Di Hapus"};
    } catch (error) {
        throw error;
    }
};

export const joinCourse = async (id_users: number, course_code: string) => {
    try {
        const checkMember = await prisma.courseMember.findFirst({
            where: {
                id_users,
                course: {
                    course_code,
                },
            },
            include:{
                course:{
                    select:{course:true}
                }
            }
        });

        if (checkMember)
            return { status: false, message: `anda sudah bergabung di course ${checkMember.course.course} `};

        const data = await prisma.course.findFirst({
            where: {
                course_code,
            },
        });

        if (!data) return { status: false, message: "Course Tidak Di Temukan" };

        await prisma.courseMember.create({
            data: {
                id_users,
                id_course: data.id_course,
                status_member: 'member', // Pastikan Anda menyesuaikan nilai ini
            },
        });

        return { status: true, message: "Berhasil Bergabung Di Course " };
    } catch (error) {
        throw error;
    }
};

export const getCourseWhenUserAsMember = async (id_users: number, id_course: number) => {
    try {
        const coursesAsMember: any = await prisma.course.findMany({
            select: {
                id_course: true,
                user: { select: { username: true } },
                course: true,
                desc_course: true,
                course_code: true,
                academy: true,
                created_at: true,
            },
            where: {
                id_course: id_course > 0 ? { lt: id_course } : undefined,
                CourseMember: {
                    some: {
                        id_users: id_users,
                        status_member:"member",
                    }
                }
            },
            orderBy: { created_at: 'desc' },
            take: 10,
        });
        let lastIdCourse = null;
        if (coursesAsMember.length > 0) {
            lastIdCourse = coursesAsMember[coursesAsMember.length - 1].id_course;
        }
        return { lastIdCourse, dataCourse: coursesAsMember };
    } catch (error) {
        throw error;
    }
};

export const checkMemberInCourse = async (id_users: number, id_course: number) => {
    try {
        const check = await prisma.courseMember.findFirst({
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
