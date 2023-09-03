import multer, { MulterError } from 'multer';
import fs from 'fs';
import path from 'path';
 
const storage = multer.diskStorage({
    destination: (req:any, file, cb) => {
        const idTugas = Number(req.body.idTugas);
        const uploadDir = path.join(__dirname, `../uploads/tugas/${idTugas}/${req.user}`);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },    
    filename: (req: any, file, cb) => {
        const uniqueName = `${req.user}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const uploadTugasSubmission: any = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const allowedFileTypes = ['.doc', '.docx', '.ppt', '.pdf','.pptx','.rar','.zip'];
        
        if (allowedFileTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('File Harus Berupa Doc, Docx, ppt, pdf, pptx'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
}).single('file');

export default uploadTugasSubmission;
