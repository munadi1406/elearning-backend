import multer, { MulterError } from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req: any, file, cb) => {
        const uploadDir = `src/uploads/users/${req.user}`;
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req: any, file, cb) => {
        const uniqueName = `${req.user}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const upload: any = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const allowedFileTypes = ['.png', '.jpg', '.jpeg', '.webp'];
        
        if (allowedFileTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Foto Harus Berupa Png, jpg, jpeg, webp'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
}).single('image');

export default upload;
