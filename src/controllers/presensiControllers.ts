import { Response } from 'express';
import { requestWithIdUsers } from './postController';
import { errorResponse } from './usersController';
import { AbsensiPayload, createPresensi,  recordPresensi } from '../model/Presensi';

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
        console.log(error)
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
        console.log(error)
        return errorResponse(res)
    }
}

