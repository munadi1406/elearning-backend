import { LogPresensi } from "./schema/PresensiLog"


interface logDataIT{
    idPresensi:number;
    idUsers:number;
    typePresensi:string;
    status:string;
    desc?:string;
}

export const insertLogPresensi = async(data:logDataIT)=>{
    try {
        const insert = await LogPresensi.create({
            id_presensi:data.idPresensi,
            id_users:data.idUsers,
            type_presensi:data.typePresensi,
            status:data.status,
            desc:data.desc ? data.desc : ''
        })
        return insert ? true : false;
    } catch (error) {
        throw error
    }
}