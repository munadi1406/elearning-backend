import { checkMemberInCourse } from './courseModel';
import { sequelize } from "../config/db";
import { Presensi } from "./schema/Presensi";
import { Course } from "./schema/Course";
import { GpsPresensi } from "./schema/GpsPresensi";
import { Post } from "./schema/Post";
import { QRCodePresensi } from "./schema/QRCodePresensi";
import { TokenPresensi } from "./schema/TokenPresensi";
import { randomUUID } from "crypto";
import { insertLogPresensi } from "./LogPresensiModel";
import { LogPresensi } from "./schema/PresensiLog";
import { Op, Sequelize } from "sequelize";
import { myCache } from '../middleware/cacheManager';
import { check } from 'express-validator';
import { checkUsersAsInstructur } from '../services/checkMemberAsInstructur';
import { CourseMember } from './schema/CourseMember';
import { Users } from './schema/Users';

interface presensiData {
    name_location?: string;
    gps_latitude?: number;
    gps_longitude?: number;
    token?: string;
}

export interface AbsensiPayload {
    id_users: number;
    idCourse: number;
    startDate: string;
    endDate: string;
    presensiType: string;
    presensiData: presensiData;
}

export const createPresensi = async (payload: AbsensiPayload) => {
    const t = await sequelize.transaction()
    try {
        const checkIsAuthor = await Course.findOne({
            where: {
                id_users: payload.id_users,
                id_course: payload.idCourse,
            },
        });

        if (!checkIsAuthor) {
            throw new Error('Anda Bukan Anggota Course Ini');
        }

        const date = new Date().toISOString();

        const newPost: any = await Post.create({
            id_course: payload.idCourse,
            id_users: payload.id_users,
            typePost: 'Presensi',
            judul: `Presensi ${date}`,
        }, { transaction: t });

        const metodeAbsensi = payload.presensiType.split(',');
        const absensi: any = await Presensi.create({
            id_post: newPost.id_post,
            start_date: new Date(payload.startDate).toISOString(),
            end_date: new Date(payload.endDate).toISOString(),
            presensi_type: payload.presensiType.toLocaleLowerCase(),
        }, { transaction: t });

        for (const metode of metodeAbsensi) {
            if (metode.toLocaleLowerCase() === 'gps' && payload.presensiData.name_location && payload.presensiData.gps_latitude && payload.presensiData.gps_longitude) {
                await GpsPresensi.create({
                    id_presensi: absensi.id_presensi,
                    name_location: payload.presensiData.name_location,
                    gps_latitude: payload.presensiData.gps_latitude,
                    gps_longitude: payload.presensiData.gps_longitude,
                }, { transaction: t });
            } else if (metode.toLocaleLowerCase() === 'qrcode') {
                let qrCodeToken = randomUUID()
                const checkTokenQrCode = await QRCodePresensi.findOne({
                    attributes: ['qrcode_token'],
                    where: { qrcode_token: qrCodeToken }
                })
                if (checkTokenQrCode) {
                    qrCodeToken = randomUUID()
                }
                await QRCodePresensi.create({
                    id_presensi: absensi.id_presensi,
                    qrcode_token: randomUUID(),
                }, { transaction: t });
            } else if (metode.toLocaleLowerCase() === 'token' && payload.presensiData.token) {
                const existingToken = await TokenPresensi.findOne({
                    attributes: ['token'],
                    where: {
                        token: payload.presensiData.token,
                    },
                });

                if (existingToken) {
                    return { status: false, message: "token sudah digunakan" }
                }

                await TokenPresensi.create({
                    id_presensi: absensi.id_presensi,
                    token: payload.presensiData.token,
                }, { transaction: t });
            }
        }
        await t.commit()
        return { status: true, message: "Presensi Berhasil Di Post" }
    } catch (error) {
        await t.rollback()
        throw error;
    }
}

interface recordPresenstiIt {
    idPresensi: number;
    idUsers: number;
    idCourse: number;
    type: string;
    lat?: string;
    lon?: string;
    qrCodeToken?: string;
    token?: string;
}

export const recordPresensi = async (data: recordPresenstiIt) => {
    try {
        const checkMemberIn = await checkMemberInCourse(data.idUsers, data.idCourse);
        if (!checkMemberIn) return { status: false, message: "Anda Bukan Anggota Course Ini" }
        const checkUserAsInstructur = await checkUsersAsInstructur(data.idUsers, data.idCourse)
        if (checkUserAsInstructur) return { status: false, message: "Anda Tidak Perlu Melakukan Presensi Karena Anda Adalah Instruktur Di Course ini" }
        const checkPresensi: any = await Presensi.findOne({
            where: {
                id_presensi: data.idPresensi,
            }
        })
        const checkDatePresensi = checkDate(checkPresensi.end_date);
        if (!checkDatePresensi) return { status: false, message: "Presensi Telah Di Tutup" }
        const checkStatusPresensi = await checkUsersIsPresent(data.idPresensi, data.idUsers)
        if (checkStatusPresensi) return { status: false, message: "Anda Sudah Melakukan Presensi" }
        const split = checkPresensi.presensi_type.split(',')
        if (!split.includes(data.type)) return { status: false, message: "Metode Absensi Tidak Di Gunakan" }
        if (!checkPresensi) return { status: false, message: "Presensi Tidak Di Temukan" };
        if (data.type.toLocaleLowerCase() === 'token') {
            const { idPresensi, token } = data;
            const checkToken: any = await TokenPresensi.findOne({
                attributes: ['token'],
                where: {
                    id_presensi: idPresensi,
                }
            })
            if (!checkToken) return { status: false, message: "Presensi Tidak Di Temukan" };
            if (checkToken.token === token) {
                const payloadLog = {
                    idPresensi: idPresensi,
                    idUsers: data.idUsers,
                    typePresensi: "Token",
                    status: "Hadir",
                }
                const insertLog = await insertLogPresensi(payloadLog);
                return insertLog ? { status: true, message: "Presensi Berhasil" } : { status: false, message: "Presensi Gagal" }
            } else {
                return { status: false, message: "Token Presensi Salah" }
            }
        } else if (data.type.toLocaleLowerCase() === 'qrcode') {
            const { idPresensi, qrCodeToken } = data;
            console.log(qrCodeToken)
            const checkToken: any = await QRCodePresensi.findOne({
                attributes: ['qrcode_token'],
                where: {
                    id_presensi: idPresensi,
                }
            })
            if (!checkToken) return { status: false, message: "Presensi Tidak Di Temukan" };
            if (checkToken.qrcode_token === qrCodeToken) {
                const payloadLog = {
                    idPresensi: idPresensi,
                    idUsers: data.idUsers,
                    typePresensi: "QR Code",
                    status: "Hadir",
                }
                const insertLog = await insertLogPresensi(payloadLog);
                return insertLog ? { status: true, message: "Presensi Berhasil" } : { status: false, message: "Presensi Gagal" }
            }
        } else if (data.type.toLocaleLowerCase() === "gps") {
            const { lat, lon, idPresensi } = data;

            const checkLocation: any = await GpsPresensi.findOne({
                attributes: ['gps_latitude', 'gps_longitude'],
                where: {
                    id_presensi: idPresensi
                }
            });
            const locationCheck = haversine(checkLocation.gps_latitude, checkLocation.gps_longitude, lat, lon)
            if (locationCheck <= 0.05) {
                console.log("didalam raduis")
                const payloadLog = {
                    idPresensi: idPresensi,
                    idUsers: data.idUsers,
                    typePresensi: "GPS",
                    status: "Hadir",
                }
                const insertLog = await insertLogPresensi(payloadLog);
                return insertLog ? { status: true, message: "Presensi Berhasil" } : { status: false, message: "Presensi Gagall" }
            } else {
                return { status: false, message: "Lokasi Anda Diluar Dari Lokasi Absensi-Radius 50 Meter" }
            }
        }
        return { status: false, message: "Presensi Gagal" }
    } catch (error) {
        console.log(error);
        throw error
    }
}


export const detailPresensi = async (idPost: number) => {
    try {
        const data = await Post.findOne({
            attributes: ['id_post', 'id_users', 'judul', 'typePost'],
            include: {
                attributes: ['id_presensi', 'start_date', 'end_date', 'presensi_type'],
                model: Presensi,
                as: "presensi",
                include: [{
                    attributes: ['name_location'],
                    model: GpsPresensi,
                    as: 'gps',
                }],
            },
            where: {
                id_post: idPost
            }
        })
        return data
    } catch (error) {
        throw error
    }
}

export const detailPresensiCredentials = async (idPresensi: number, idUsers: number, idCourse: number) => {
    try {
        const check = await checkMemberInCourse(idUsers, idCourse)
        if (!check) return { status: false, message: "Anda Tidak Memiliki Akses" }
        const dataCache = myCache.get(`detailPresensiCredentials-${idPresensi}`)
        if (dataCache) {
            return { status: true, data: dataCache }
        }
        const data = await Presensi.findOne({
            attributes: [],
            include: [
                {
                    model: GpsPresensi,
                    attributes: ['name_location', 'gps_latitude', 'gps_longitude'],
                    as: "gps",
                    required: false
                }, {
                    model: QRCodePresensi,
                    attributes: ['qrcode_token'],
                    as: "qrcode",
                    required: false,
                }, {
                    model: TokenPresensi,
                    attributes: ['token'],
                    as: "token",
                    required: false
                }
            ],
            where: {
                id_presensi: idPresensi
            }
        })
        const payloadCopy = JSON.parse(JSON.stringify(data))
        myCache.set(`detailPresensiCredentials-${idPresensi}`, payloadCopy)
        return { status: true, data }
    } catch (error) {
        throw error
    }
}

export const getPresensiType = async (idPresensi: number) => {
    try {
        const dataCache = myCache.get(`presensiType-${idPresensi}`)
        if (dataCache) {
            return { status: true, data: dataCache }
        }
        const data = await Presensi.findByPk(idPresensi, {
            attributes: ['presensi_type'],
        })
        const payloadCopy = JSON.parse(JSON.stringify(data))
        myCache.set(`presensiType-${idPresensi}`, payloadCopy)
        return data
    } catch (error) {
        throw error
    }
}


export const detailPresensiForUpdate = async (idUsers: number, idCourse: number, idPresensi: number) => {
    try {
        const check = await checkMemberInCourse(idUsers, idCourse)
        if (!check) return { status: false, message: "Anda Tidak Memiliki Akses" }
        const dataCache = myCache.get(`detailPresensiUpdate-${idPresensi}`)
        if (dataCache) {
            return { status: true, data: dataCache }
        }
        const data = await Presensi.findOne({
            include: [
                {
                    model: GpsPresensi,
                    attributes: ['name_location', 'gps_latitude', 'gps_longitude'],
                    as: "gps",
                    required: false
                }, {
                    model: QRCodePresensi,
                    attributes: ['qrcode_token'],
                    as: "qrcode",
                    required: false,
                }, {
                    model: TokenPresensi,
                    attributes: ['token'],
                    as: "token",
                    required: false
                }
            ],
            where: { id_presensi: idPresensi }
        })
        const payloadCopy = JSON.parse(JSON.stringify(data))
        myCache.set(`detailPresensiUpdate-${idPresensi}`, payloadCopy)
        return { status: true, data }
    } catch (error) {
        throw error
    }
}


// untuk update start_date dan end_date presensi
export const updatePresensi = async (id_presensi: number, id_users: number, id_course: number, startDate: string, endDate: string) => {
    try {
        const check = await checkMemberInCourse(id_users, id_course)
        if (!check) return { status: false, message: "Anda Tidak Memiliki Akses" }
        const update = await Presensi.update({
            start_date: new Date(startDate).toISOString(),
            end_date: new Date(endDate).toISOString(),
        }, { where: { id_presensi } })
        if (update) {
            return { status: true, message: "Presensi Berhasil Di Update" }
        } else {
            return { status: false, message: "Presensi Gagal Di Update" }
        }
    } catch (error) {
        throw error;
    }
}


export const updateGpsLocationPresensi = async (id_presensi: number, id_users: number, id_course: number, name_location: string, lat: string, lon: string) => {
    try {
        const check = await checkMemberInCourse(id_users, id_course)
        if (!check) return { status: false, message: "Anda Tidak Memiliki Akses" }
        const update = await GpsPresensi.update({
            name_location,
            gps_latitude: lat,
            gps_longitude: lon,
        }, { where: { id_presensi } })
        if (update) {
            return { status: true, message: "Lokasi Presensi Berhasil Di Update" }
        } else {
            return { status: false, message: "Lokasi Presensi Gagal Di Update" }
        }
    } catch (error) {
        throw error;
    }
}


export const updateTokenPresensi = async (id_presensi: number, id_users: number, id_course: number, token: string) => {
    try {
        const check = await checkMemberInCourse(id_users, id_course)
        if (!check) return { status: false, message: "Anda Tidak Memiliki Akses" }
        const existingToken = await TokenPresensi.findOne({
            attributes: ['token'],
            where: {
                token,
            },
        });

        if (existingToken) {
            return { status: false, message: "token sudah digunakan" }
        }
        const update = await TokenPresensi.update({
            token
        }, { where: { id_presensi } })
        if (update) {
            return { status: true, message: "Token Presensi Berhasil Di Update" }
        } else {
            return { status: false, message: "Token Presensi Gagal Di Update" }
        }
    } catch (error) {
        throw error;
    }
}


export const getAllMemberForPresensiManual = async (idCourse: number, idUsers: number) => {
    try {
        const check = await checkMemberInCourse(idUsers, idCourse);
        if (!check) {
            return { status: false, message: "Anda Tidak Memiliki Akses" };
        }
       
        const data = await CourseMember.findAll({
            attributes: [],
            include: {
                attributes:['id_users','username'],
                model: Users,
                as: 'users'
            },
            where: {
                id_course: idCourse,
                status_member: "member",
            }
        })
        return data
    } catch (error) {
        throw error
    }
}

export const manualPresensi = async (id_course: number, id_presensi: number, id_users: number, status: string) => {
    try {
        const check = await checkMemberInCourse(id_users, id_course);
        if (!check) {
            return { status: false, message: "Anda Tidak Memiliki Akses" };
        }
        const [log_presensi,created] = await LogPresensi.findOrCreate({
            where: {
                id_presensi: id_presensi,
                id_users: id_users,
            },
            defaults: {
                type_presensi: "Presensi Oleh Instruktur",
                status: status,
                desc: "Di Input Oleh Instruktur Course",
            },
        });
        console.log(created)
        if (created) {
            return { status: true, message: "Presensi berhasil dicatat" };
        } else {
            return { status: true, message: "Presensi sudah di lakukan member" };
        }
    } catch (error) {
        // Tangani kesalahan
        console.error(error);
        throw error;
    }
}



export const reportPresensi = async (idCourse: number, idPresensi: number, idUsers: number) => {
    try {
        console.log("running");
        const check = await checkMemberInCourse(idUsers, idCourse);
        if (!check) {
            return { status: false, message: "Anda Tidak Memiliki Akses" };
        }

        // Dapatkan semua data member yang terdaftar dalam course dengan status "member"
        const dataMember: any = await CourseMember.findAll({ 
            attributes:['id_users'],
            include:{
                model:Users,
                as:"users",
                attributes:['username'],
            },
            where: { id_course: idCourse, status_member: "member" } });

        // Dapatkan semua data log presensi untuk presensi tertentu
        const dataLogPresensi = await LogPresensi.findAll({ where: { id_presensi: idPresensi } });

        // Buat objek untuk menyimpan hasil laporan
        const report = [];

        // Loop melalui data member dan periksa apakah mereka melakukan presensi
        for (const member of dataMember) {
            const logPresensi:any = dataLogPresensi.find((log: any) => log.id_users === member.id_users);

            if (logPresensi) {
                // Member melakukan presensi
                report.push({
                    id_users: member.id_users,
                    nama: member.users.username,
                    status: logPresensi.status,
                    desc: logPresensi.desc,
                    createdAt: logPresensi.createdAt,
                });
            } else {
                // Member tidak melakukan presensi
                report.push({
                    id_users: member.id_users,
                    nama: member.users.username,
                    status: "tidak hadir",
                    desc:"tidak melakukan presensi"
                });
            }
        }

        return { status: true,  data: report };
    } catch (error) {
        console.log(error)
        throw error;
    }
}



const checkDate = (date: string) => {
    const datePresensi = new Date(date);
    const currentDate = new Date()
    if (currentDate > datePresensi) {
        return false
    }
    return true
}

const checkUsersIsPresent = async (idPresensi: number, idUsers: number) => {
    try {
        const check = await LogPresensi.findOne({
            attributes: ['status'],
            where: {
                id_presensi: idPresensi,
                id_users: idUsers,
            }
        })
        return check ? true : false;
    } catch (error) {
        throw error
    }
}



function haversine(presensiLat: any, presensiLon: any, userLat: any, userLon: any) {
    const R = 6371; // Radius Bumi dalam kilometer
    const dLat = (userLat - presensiLat) * (Math.PI / 180);
    const dLon = (userLon - presensiLon) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(presensiLat * (Math.PI / 180)) *
        Math.cos(userLat * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Jarak dalam kilometer
    return distance;
}