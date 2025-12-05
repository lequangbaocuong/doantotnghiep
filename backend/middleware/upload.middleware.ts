import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/evidences"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

export const uploadEvidence = multer({
    storage,
    limits: { 
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 5,
    },
    fileFilter: (req, file, cb) => {
        // Chỉ chấp nhận các định dạng ảnh, video, pdf phổ biến
        if (file.mimetype.match(/jpeg|jpg|png|gif|mp4|mov|pdf/)) {
            cb(null, true);
        } else {
            cb(new Error('Định dạng file không hợp lệ!'));
        }
    }
}).array('files', 5);

export const uploadWanted = multer({
    storage,
    limits: { 
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 5,
    },
    fileFilter: (req, file, cb) => {
        // Chỉ chấp nhận các định dạng ảnh, video, pdf phổ biến
        if (file.mimetype.match(/jpeg|jpg|png|gif|mp4|mov|pdf/)) {
            cb(null, true);
        } else {
            cb(new Error('Định dạng file không hợp lệ!'));
        }
    }
}).single('anh');