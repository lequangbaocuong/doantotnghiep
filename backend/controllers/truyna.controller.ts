import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { truyna, MucDo, GioiTinh } from '../entity/truyna';
import { generateId } from '../utils/idreport.util';

export const truynaController = {
    async create(req: Request, res: Response) {
        try {
            const {
                hoten, tuoi, gioitinh, toidanh, mucdo, diachi, mota, id_canbo
            } = req.body;

            const file = req.file; // Lấy file ảnh upload lên

            const truynaRepo = AppDataSource.getRepository(truyna);

            // Tạo entity mới
            const newTruyNa = truynaRepo.create({
                id_truyna: generateId('TN'), // Tạo ID dạng TNxxxxx
                hoten,
                tuoi: parseInt(tuoi),
                gioitinh: gioitinh as GioiTinh,
                toidanh,
                mucdo: mucdo as MucDo,
                diachi,
                mota,
                anh: file ? `/uploads/evidences/${file.filename}` : '', // Lưu đường dẫn ảnh
                trangthai: "chờ duyệt", // Mặc định là chờ duyệt
                id_canbo: id_canbo // ID cán bộ đăng tải
            });

            await truynaRepo.save(newTruyNa);

            return res.status(201).json({
                success: true,
                message: "Đăng tải lệnh truy nã thành công, vui lòng chờ duyệt!",
                data: newTruyNa
            });

        } catch (error) {
            console.error("Lỗi đăng tải truy nã:", error);
            return res.status(500).json({ message: "Lỗi server khi đăng tải truy nã" });
        }
    }
};