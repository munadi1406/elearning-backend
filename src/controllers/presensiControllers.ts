import { Response } from 'express';
import { requestWithIdUsers } from './postController';
import { errorResponse } from './usersController';
import { AbsensiPayload, createPresensi, detailPresensi, detailPresensiCredentials, detailPresensiForUpdate, getAllMemberForPresensiManual, getPresensiType, manualPresensi, recordPresensi, reportPresensi, updateGpsLocationPresensi, updatePresensi, updateTokenPresensi } from '../model/Presensi';

export const handleCreatePresensi = async (req: requestWithIdUsers, res: Response) => {
    try {
        const idUsers = req.user
        const payload: AbsensiPayload = { ...req.body, id_users: idUsers }
        const create = await createPresensi(payload)
        if (create.status) {
            return res.status(201).json({ statusCode: 201, message: create.message })
        } else {
            return res.status(404).json({ statusCode: 404, message: create.message })
        }
    } catch (error) {
        return errorResponse(res)
    }
}

export const handleRecordPresensi = async (req: requestWithIdUsers, res: Response) => {
    try {
        const idUsers = req.user
        const data = { ...req.body, idUsers }
        const record: any = await recordPresensi(data)
        if (record.status) {
            return res.status(201).json({ statusCode: 201, message: record.message })
        } else {
            return res.status(404).json({ statusCode: 404, message: record.message })
        }
    } catch (error) {
        return errorResponse(res)
    }
}

export const handleDetailPresensiCredentials = async (req: requestWithIdUsers, res: Response) => {
    try {
        const { idCourse, idPresensi } = req.params
        const idUsers = Number(req.user)
        const data = await detailPresensiCredentials(Number(idPresensi), idUsers, Number(idCourse))
        if (data.status) {
            return res.status(200).json({ statusCode: 200, data: data.data })
        } else {
            return res.status(404).json({ statusCode: 404, message: data.message })
        }
    } catch (error) {
        return errorResponse(res)
    }
}

export const handleGetPresensiType = async (req: requestWithIdUsers, res: Response) => {
    try {
        const { idPresensi } = req.params
        const data = await getPresensiType(Number(idPresensi))
        return res.status(200).json({ statusCode: 200, data: data })
    } catch (error) {
        return errorResponse(res)
    }
}

export const handleDetailPresensiForUpdate = async (req: requestWithIdUsers, res: Response) => {
    try {
        const { idPresensi, idCourse } = req.params
        const idUsers = Number(req.user)
        const data = await detailPresensiForUpdate(idUsers, Number(idCourse), Number(idPresensi))
        return res.status(200).json({ statusCode: 200, data: data.data })
    } catch (error) {
        return errorResponse(res)
    }
}

export const handleUpdatePresensi = async (req: requestWithIdUsers, res: Response) => {
    try {
        const { idPresensi, idCourse, startDate, endDate } = req.body
        const idUsers = Number(req.user)
        const data = await updatePresensi(Number(idPresensi), idUsers, Number(idCourse), startDate, endDate)
        if (data.status) {
            return res.status(200).json({ statusCode: 200, data: data.message })
        } else {
            return res.status(404).json({ statusCode: 404, message: data.message })
        }
    } catch (error) {
        return errorResponse(res)
    }
}

export const handleUpdateGpsLocationPresensi = async (req: requestWithIdUsers, res: Response) => {
    try {
        const { idPresensi, idCourse, nameLocation, lat, lon } = req.body
        const idUsers = Number(req.user)
        const data = await updateGpsLocationPresensi(Number(idPresensi), idUsers, Number(idCourse), nameLocation, lat, lon)
        if (data.status) {
            return res.status(200).json({ statusCode: 200, data: data.message })
        } else {
            return res.status(404).json({ statusCode: 404, message: data.message })
        }
    } catch (error) {
        return errorResponse(res)
    }
}

export const handleUpdateTokenPresensi = async (req: requestWithIdUsers, res: Response) => {
    try {
        const { idPresensi, idCourse, token } = req.body
        const idUsers = Number(req.user)
        const data = await updateTokenPresensi(Number(idPresensi), idUsers, Number(idCourse), token)
        if (data.status) {
            return res.status(200).json({ statusCode: 200, data: data.message })
        } else {
            return res.status(404).json({ statusCode: 404, message: data.message })
        }
    } catch (error) {
        return errorResponse(res)
    }
}



export const handleGetAllMemberForPresensiManual = async (req: requestWithIdUsers, res: Response) => {
    try {
        const { idCourse } = req.params
        const idUsers = Number(req.user)
        const data = await getAllMemberForPresensiManual(Number(idCourse), idUsers)

        return res.status(200).json({ statusCode: 200, data })

    } catch (error) {
        return errorResponse(res)
    }
}




export const handleManualPresensi = async (req: requestWithIdUsers, res: Response) => {
    try {
        const { idPresensi, idCourse,  status ,idUsers} = req.body
      
        const data = await manualPresensi(Number(idCourse), Number(idPresensi), Number(idUsers),  status)
        if (data.status) {
            return res.status(200).json({ statusCode: 200, data: data.message })
        } else {
            return res.status(404).json({ statusCode: 404, message: data.message })
        }
    } catch (error) {
        return errorResponse(res)
    }
}

export const handleReportPresensi = async (req: requestWithIdUsers, res: Response) => {
    try {
        const { idPresensi, idCourse, } = req.params
        const idUsers = Number(req.user)
        const data = await reportPresensi(Number(idCourse), Number(idPresensi), idUsers,)
        if (data.status) {
            return res.status(200).json({ statusCode: 200, data: data.data })
        }
    } catch (error) {
        return errorResponse(res)
    }
}