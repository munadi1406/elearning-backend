import { Response } from "express";
import { errorResponse, requestWithIdUsers } from "./postController";
import { cancelSubmitTugas, downloadFileTugasSubmit, listSubmitTugas, listTugas, previewFileTugas } from "../model/tugasModel";
import { insertNilaiTugas } from "../model/nilaiTugas";

export const handleCancelSubmitTugas = async (req: requestWithIdUsers, res: Response) => {
    try {
        const idTugasSubmission: number = Number(req.body.idTugasSubmission)
        const idUsers: number = Number(req.user)
        const data = await cancelSubmitTugas(idUsers, idTugasSubmission);
        if (data.status) {
            return res.status(200).json({ statusCode: 200, message: data.message });
        } else {
            return res.status(404).json({ statusCode: 404, message: data.message });
        }
    } catch (error) {
        console.log(error)
        return errorResponse(res)
    }
}


export const handleGetListSubmitTugas = async (req: requestWithIdUsers, res: Response) => {
    try {
        const idTugas: number = Number(req.params.idTugas)
        const idUsers = Number(req.user)
        const data = await listSubmitTugas(idTugas, idUsers);
        if (data.status) {
            return res.status(200).json({ statusCode: 200, data: data?.data })
        } else {
            return res.status(400).json({ statusCode: 400, message: data.message })
        }
    } catch (error) {
        return errorResponse(res)
    }
}

export const handleNilaiInsert = async (req: requestWithIdUsers, res: Response) => {
    try {
        const { idUsers, idTugasSubmission, nilai } = req.body
        const idAuthor = req.user
        const insert = await insertNilaiTugas(Number(idUsers), Number(idTugasSubmission), `${nilai}`, Number(idAuthor))
        if (insert.status) {
            return res.status(200).json({ statusCode: 200, data: insert.message })
        } else {
            return res.status(400).json({ statusCode: 400, data: insert.message })
        }
    } catch (error) {
        return errorResponse(res)
    }
}


export const handleListTugas = async (req: requestWithIdUsers, res: Response) => {
    try {
        const idUsers = req.user
        const idPost = Number(req.params.idPost)
        const insert = await listTugas(Number(idUsers), idPost)
        return res.status(200).json({ statusCode: 200, data: insert.datas })
    } catch (error) {
        return errorResponse(res)
    }
}


export const handleDownloadFileTugasSubmit = async (req: requestWithIdUsers, res: Response) => {
    try {
        const { idTugas, idUsers, fileName } = req.params
        const file: any = await downloadFileTugasSubmit(Number(idTugas), Number(idUsers), fileName)

        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
        res.send(file);
    } catch (error) {
        return res.sendStatus(404)
    }
}


export const handlePreviewFIleTugasSubmit = async (req: requestWithIdUsers, res: Response) => {
    try {
        const { idTugas, idUsers, fileName } = req.params
        const file: any = await previewFileTugas(Number(idTugas), Number(idUsers), fileName)
        res.setHeader("Content-Type", "application/pdf");
        res.send(file);
    } catch (error) {
        return res.sendStatus(404)
    }
}
