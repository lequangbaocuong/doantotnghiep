// backend/controllers/suspect.controller.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { nghipham } from '../entity/nghipham';
import { generateId } from '../utils/idrgenerate.util';

export const suspectController = {
    async addSuspect(req: Request, res: Response) {
        try {
            const {
                id_vuan, 
                hoten,
                gioitinh,
                ngaysinh,
                cccd,
                tinhtrangbatgiu,
                diachi
            } = req.body;

            const file = req.file;

            if (!id_vuan || !hoten) {
                return res.status(400).json({ message: "Thiếu thông tin bắt buộc (Mã vụ án, Họ tên)" });
            }

            const suspectRepo = AppDataSource.getRepository(nghipham);

            const newSuspect = suspectRepo.create({
                id_nghipham: generateId('NP'), 
                id_vuan,
                hoten,
                gioitinh,
                ngaysinh,
                cccd,
                tinhtrangbatgiu,
                diachi,
                anh: file ? `/uploads/evidences/${file.filename}` : ''
            });

            await suspectRepo.save(newSuspect);

            return res.status(201).json({
                success: true,
                message: "Đã thêm nghi phạm vào hồ sơ vụ án!",
                data: newSuspect
            });

        } catch (error) {
            console.error("Lỗi thêm nghi phạm:", error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    },
    
    async getSuspectsByCase(req: Request, res: Response) {
        try {
            const { id_vuan } = req.params;
            const suspectRepo = AppDataSource.getRepository(nghipham);
            
            const suspects = await suspectRepo.find({
                where: { id_vuan: id_vuan }
            });
            
            return res.status(200).json(suspects);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi lấy danh sách nghi phạm" });
        }
    },

    async getDetail(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const suspectRepo = AppDataSource.getRepository(nghipham);

            const suspect = await suspectRepo.findOne({
                where: { id_nghipham: id },
                relations: ["hosovuan"] 
            });

            if (!suspect) {
                return res.status(404).json({ message: "Không tìm thấy nghi phạm" });
            }

            return res.status(200).json(suspect);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    }
};