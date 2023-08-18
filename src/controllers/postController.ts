import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { createPengumuman, createTugas, getPost, streamFile } from "../model/postModel";
import uploadfileTugas from "../services/multerFileTugas";
import { MulterError } from "multer";



interface requestWithIdUsers extends Request {
    user?: number;
}
export const handleCreatePengumuman = async (req: requestWithIdUsers, res: Response) => {
    const authValidationRules = [
        body('idCourse')
            .notEmpty().withMessage("Masukkan Id Course"),

        body('konten')
            .notEmpty().withMessage('Masukkan Isi Pengumuman')
            .isAscii().withMessage("Isi Pengumuman Tidak Valid")
    ]
    try {
        await Promise.all(authValidationRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages });
        }
        const { idCourse, konten } = req.body;
        const data = await createPengumuman({ id_users: Number(req.user), id_course: Number(idCourse), konten })
        if (data) {
            return res.status(200).json({ statusCode: 200, message: data })
        } else {
            return res.status(404).json({ statusCode: 404, message: data })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" })
    }
}

// eksekusi model
export const handleInsertTugas = async (req: requestWithIdUsers, res: Response) => {
    const authValidationRules = [
        body('idCourse')
            .notEmpty().withMessage("Masukkan Id Course"),

        body('deskripsi')
            .notEmpty().withMessage('Masukkan Deskripsi Tuguas')
            .isAscii().withMessage("Isi Deskripsi Tidak Valid"),
        body('fromDate')
            .notEmpty().withMessage('Masukkan Tanggal Mulai Tugas'),
        body('toDate')
            .notEmpty().withMessage('Masukkan Tanggal Berakhir Tugas'),
        body('accept')
            .notEmpty().withMessage('Masukkan Accept')
            .isIn(["Doc", "Pdf", "Ppt"]).withMessage("Accept Tidak Valid"),
    ]
    try {
        await Promise.all(authValidationRules.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages });
        }
        const { idCourse, deskripsi, fromDate, toDate, accept } = req.body;
        const fileName = req.file?.filename
        const data = await createTugas({ id_users: Number(req.user), id_course: Number(idCourse), deskripsi, fromDate, toDate, accept, file: fileName })
        if (data) {
            return res.status(200).json({ statusCode: 200, message: data })
        } else {
            return res.status(404).json({ statusCode: 404, message: data })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" })
    }
}

// penerima error untuk upload file
export const handleCreateTugas = (req: Request, res: Response,) => {
    try {
        uploadfileTugas(req, res, async (err: any) => {
            console.log(err);
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ statusCode: 400, message: 'Ukuran file melebihi batas maksimum 5MB.' });
                }
            } else if (err) {
                return res.status(400).json({ statusCode: 400, message: 'File Harus Berupa Doc, Docx, ppt, pdf, pptx' });
            }
            handleInsertTugas(req, res);
        });
    } catch (error) {
        console.log(error);
    }
}

export const downloadFileTugas = async (req: requestWithIdUsers, res: Response) => {
    try {
        console.log("runing");
        const { idCourse, fileName } = req.params
        const file: any = await streamFile(idCourse, fileName)

        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
        res.send(file);
    } catch (error) {
        return res.sendStatus(404)
    }
}


export const handleGetPost = async (req: requestWithIdUsers, res: Response) => {
    const getListPostValidate = [
        param('idCourse')
            .isInt().withMessage("Id Course Harus Berupa Angka"),
        param('idPost')
            .isInt().withMessage("Id Course Harus Berupa Angka"),
    ]
    try {
        await Promise.all(getListPostValidate.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ message: errorMessages });
        }
        const {idCourse,idPost} = req.params
        const data = await getPost(Number(idCourse),Number(idPost))
        return res.status(200).json({statusCode:200,data})
    } catch (error) {
        console.log(error);
        return errorResponse(res)
    }
}

const errorResponse = (res: Response) => {
    return res.status(500).json({ statusCode: 500, message: "Internal Server Error" })
  }